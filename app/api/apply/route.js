import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Path to local JSON database store
const DB_PATH = path.join(process.cwd(), "data", "registrations.json");

/**
 * Ensures data directory & registrations file exist
 */
function ensureDatabase() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2), "utf-8");
  }
}

/**
 * Reads all registration entries from local JSON database
 */
function getLocalRegistrations() {
  ensureDatabase();
  try {
    const fileData = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(fileData || "[]");
  } catch (error) {
    console.error("Error reading local database:", error);
    return [];
  }
}

/**
 * Saves updated registrations array locally
 */
function saveLocalRegistrations(registrations) {
  ensureDatabase();
  fs.writeFileSync(DB_PATH, JSON.stringify(registrations, null, 2), "utf-8");
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, scholarNo, branch, year, sports } = body;

    // Validation
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

    // Check if Cloud Supabase Credentials are set in .env.local
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        // Direct REST insertion into Supabase table 'registrations'
        const supabaseRes = await fetch(`${supabaseUrl}/rest/v1/registrations`, {
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

        if (!supabaseRes.ok) {
          console.warn("Supabase REST insert warning, falling back to local store");
        }
      } catch (cloudErr) {
        console.error("Cloud DB sync error:", cloudErr);
      }
    }

    // Always record locally as well for fail-safe persistence
    const currentRegistrations = getLocalRegistrations();
    const existingIndex = currentRegistrations.findIndex(
      (r) => r.scholarNo.toLowerCase().trim() === scholarNo.toLowerCase().trim()
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

    saveLocalRegistrations(currentRegistrations);

    return NextResponse.json({
      success: true,
      message: existingIndex !== -1 ? "Registration updated successfully!" : "Registration submitted successfully!",
      registration: newRecord,
      totalEntries: currentRegistrations.length,
    });
  } catch (error) {
    console.error("POST /api/apply error:", error);
    return NextResponse.json(
      { error: "Server error processing registration. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const registrations = getLocalRegistrations();
    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format");

    // CSV export endpoint for event organizers
    if (format === "csv") {
      const headers = "Registration ID,Name,Scholar No,Branch,Year,Sports,Timestamp\n";
      const rows = registrations
        .map(
          (r) =>
            `"${r.id}","${r.name}","${r.scholarNo}","${r.branch}","${r.year}","${r.sports.join(
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
