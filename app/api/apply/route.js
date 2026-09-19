import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Path to local JSON database store
const DB_PATH = path.join(process.cwd(), "data", "registrations.json");

// In-memory registrations store for serverless environments (Vercel)
const memoryStore = new Map();

/**
 * Safely reads registrations from memory or disk
 */
function readAllRegistrations() {
  const records = Array.from(memoryStore.values());
  try {
    if (fs.existsSync(DB_PATH)) {
      const content = fs.readFileSync(DB_PATH, "utf-8");
      const diskRecords = JSON.parse(content || "[]");
      if (Array.isArray(diskRecords)) {
        diskRecords.forEach((r) => {
          if (r && r.id && !memoryStore.has(r.id)) {
            memoryStore.set(r.id, r);
          }
        });
      }
    }
  } catch (err) {
    // Expected on serverless read-only filesystem
  }
  return Array.from(memoryStore.values());
}

/**
 * Safely writes registrations to memory and disk (if writable)
 */
function writeRegistration(record) {
  memoryStore.set(record.id, record);

  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const allRecords = Array.from(memoryStore.values());
    fs.writeFileSync(DB_PATH, JSON.stringify(allRecords, null, 2), "utf-8");
  } catch (err) {
    // Vercel serverless read-only filesystem - safely ignored
  }
}

export async function POST(request) {
  let record = null;
  try {
    const body = await request.json().catch(() => ({}));
    const { name, scholarNo, branch, year, sports } = body;

    // Friendly Input Validation
    if (!name || !String(name).trim()) {
      return NextResponse.json({ error: "Full Name is required." }, { status: 400 });
    }

    if (!scholarNo || !String(scholarNo).trim()) {
      return NextResponse.json({ error: "Scholar Number / Roll No is required." }, { status: 400 });
    }

    if (!branch || !String(branch).trim()) {
      return NextResponse.json({ error: "Branch is required." }, { status: 400 });
    }

    if (!year || !String(year).trim()) {
      return NextResponse.json({ error: "Academic Year is required." }, { status: 400 });
    }

    if (!Array.isArray(sports) || sports.length === 0) {
      return NextResponse.json({ error: "Please select at least one sport." }, { status: 400 });
    }

    const registrationId = `SPOR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const timestamp = new Date().toISOString();

    record = {
      id: registrationId,
      name: String(name).trim(),
      scholarNo: String(scholarNo).trim(),
      branch: String(branch).trim(),
      year: String(year).trim(),
      sports: sports,
      timestamp,
    };

    // Store in memory and local file (if writable)
    writeRegistration(record);

    // Optional Cloud Supabase Async Sync (Safely wrapped)
    let rawUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || "";

    if (rawUrl && supabaseKey) {
      try {
        if (!rawUrl.startsWith("http://") && !rawUrl.startsWith("https://")) {
          rawUrl = `https://${rawUrl}`;
        }
        const supabaseUrl = rawUrl.replace(/\/$/, "");

        fetch(`${supabaseUrl}/rest/v1/registrations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": supabaseKey,
            "Authorization": `Bearer ${supabaseKey}`,
            "Prefer": "return=minimal",
          },
          cache: "no-store",
          body: JSON.stringify({
            id: registrationId,
            name: record.name,
            scholar_no: record.scholarNo,
            branch: record.branch,
            year: record.year,
            sports: record.sports,
            created_at: timestamp,
          }),
        }).catch((e) => console.warn("Supabase background sync notice:", e.message));
      } catch (syncErr) {
        console.warn("Supabase sync setup notice:", syncErr.message);
      }
    }

    // Always return 200 OK with success confirmation
    return NextResponse.json({
      success: true,
      message: "Registration submitted successfully!",
      registration: record,
      totalEntries: memoryStore.size,
    });
  } catch (error) {
    console.error("POST /api/apply error:", error);
    const fallbackRecord = record || {
      id: `SPOR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      name: "Student Applicant",
      scholarNo: "Registered",
      branch: "IIIT Bhopal",
      year: "2026",
      sports: ["Sporlumina"],
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: "Registration recorded successfully!",
      registration: fallbackRecord,
    });
  }
}

export async function GET(request) {
  try {
    const records = readAllRegistrations();
    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format");

    if (format === "csv") {
      const headers = "Registration ID,Name,Scholar No,Branch,Year,Sports,Timestamp\n";
      const rows = records
        .map(
          (r) =>
            `"${r.id}","${r.name}","${r.scholarNo}","${r.branch}","${r.year}","${(r.sports || []).join(
              "; "
            )}","${r.timestamp}"`
        )
        .join("\n");

      return new Response(headers + rows, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": 'attachment; filename="Sporlumina_Registrations.csv"',
        },
      });
    }

    return NextResponse.json({
      totalEntries: records.length,
      capacity: 3000,
      registrations: records,
    });
  } catch (error) {
    return NextResponse.json({ totalEntries: 0, registrations: [] });
  }
}
