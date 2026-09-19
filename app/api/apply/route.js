import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Path to local JSON database store
const DB_PATH = path.join(process.cwd(), "data", "registrations.json");

// In-memory fallback array for serverless environments (Vercel read-only FS)
let inMemoryRegistrations = [];

/**
 * Ensures data directory & registrations file exist
 */
function ensureDatabase() {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (err) {
    // Read-only filesystem on Vercel / Serverless
    console.warn("Serverless environment detected (read-only filesystem):", err.message);
  }
}

/**
 * Reads all registration entries from local JSON database or memory
 */
function getRegistrations() {
  ensureDatabase();
  try {
    if (fs.existsSync(DB_PATH)) {
      const fileData = fs.readFileSync(DB_PATH, "utf-8");
      const parsed = JSON.parse(fileData || "[]");
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn("Reading local database warning:", error.message);
  }
  return inMemoryRegistrations;
}

/**
 * Saves updated registrations array (with EROFS serverless fallback)
 */
function saveRegistrations(registrations) {
  inMemoryRegistrations = registrations;
  try {
    ensureDatabase();
    fs.writeFileSync(DB_PATH, JSON.stringify(registrations, null, 2), "utf-8");
  } catch (err) {
    // EROFS on Vercel is expected and safe when using Supabase or in-memory
    console.warn("Local file write skipped (Serverless environment):", err.message);
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, scholarNo, branch, year, sports } = body;

    // Strict Validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Full Name is required." }, { status: 400 });
    }

    if (!scholarNo || typeof scholarNo !== "string" || !scholarNo.trim()) {
      return NextResponse.json({ error: "Scholar Number is required." }, { status: 400 });
    }

    if (!branch || typeof branch !== "string" || !branch.trim()) {
      return NextResponse.json({ error: "Branch is required." }, { status: 400 });
    }

    if (!year || typeof year !== "string" || !year.trim()) {
      return NextResponse.json({ error: "Year is required." }, { status: 400 });
    }

    if (!Array.isArray(sports) || sports.length === 0) {
      return NextResponse.json({ error: "Please select at least one sport to participate in." }, { status: 400 });
    }

    const registrationId = `SPOR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const timestamp = new Date().toISOString();

    const newRecord = {
      id: registrationId,
      name: name.trim(),
      scholarNo: scholarNo.trim(),
      branch: branch.trim(),
      year: year.trim(),
      sports: sports,
      timestamp,
    };

    // Check if Cloud Supabase Credentials are configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    let supabaseSaved = false;

    if (supabaseUrl && supabaseKey) {
      try {
        const supabaseRes = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/registrations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": supabaseKey,
            "Authorization": `Bearer ${supabaseKey}`,
            "Prefer": "return=minimal",
          },
          body: JSON.stringify({
            id: registrationId,
            name: name.trim(),
            scholar_no: scholarNo.trim(),
            branch: branch.trim(),
            year: year.trim(),
            sports: sports,
            created_at: timestamp,
          }),
        });

        if (supabaseRes.ok) {
          supabaseSaved = true;
        } else {
          const supabaseErrText = await supabaseRes.text();
          console.warn("Supabase insert warning:", supabaseRes.status, supabaseErrText);
        }
      } catch (cloudErr) {
        console.error("Supabase connection error:", cloudErr.message);
      }
    }

    // Record locally and in-memory
    const currentRegistrations = getRegistrations();
    const existingIndex = currentRegistrations.findIndex(
      (r) => r.scholarNo && r.scholarNo.toLowerCase().trim() === scholarNo.toLowerCase().trim()
    );

    if (existingIndex !== -1) {
      currentRegistrations[existingIndex] = {
        ...currentRegistrations[existingIndex],
        ...newRecord,
        updatedAt: timestamp,
      };
    } else {
      currentRegistrations.push(newRecord);
    }

    saveRegistrations(currentRegistrations);

    return NextResponse.json({
      success: true,
      message: existingIndex !== -1 ? "Registration updated successfully!" : "Registration submitted successfully!",
      registration: newRecord,
      supabaseSaved,
      totalEntries: currentRegistrations.length,
    });
  } catch (error) {
    console.error("POST /api/apply error:", error);
    return NextResponse.json(
      { error: `Registration error: ${error.message || "Please check your inputs."}` },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const registrations = getRegistrations();
    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format");

    if (format === "csv") {
      const headers = "Registration ID,Name,Scholar No,Branch,Year,Sports,Timestamp\n";
      const rows = registrations
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
      totalEntries: registrations.length,
      capacity: 3000,
      registrations: registrations,
    });
  } catch (error) {
    console.error("GET /api/apply error:", error);
    return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 });
  }
}
