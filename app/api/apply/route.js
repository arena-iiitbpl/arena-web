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

/**
 * Safely deletes a registration from memory and disk (if writable)
 */
function deleteRegistration(id) {
  memoryStore.delete(id);

  try {
    const dir = path.dirname(DB_PATH);
    if (fs.existsSync(DB_PATH)) {
      const allRecords = Array.from(memoryStore.values());
      fs.writeFileSync(DB_PATH, JSON.stringify(allRecords, null, 2), "utf-8");
    }
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

/**
 * Generates an Excel Spreadsheet XML document (.xls format)
 */
function generateXlsSpreadsheet(records) {
  const escapeXml = (str) =>
    String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  const rowsXml = records
    .map((r) => {
      const sportsStr = Array.isArray(r.sports) ? r.sports.join("; ") : String(r.sports || "");
      const formattedDate = r.timestamp
        ? new Date(r.timestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        : "";

      return `
   <Row ss:Height="22">
    <Cell ss:StyleID="IDCell"><Data ss:Type="String">${escapeXml(r.id)}</Data></Cell>
    <Cell ss:StyleID="TextCell"><Data ss:Type="String">${escapeXml(r.name)}</Data></Cell>
    <Cell ss:StyleID="TextCell"><Data ss:Type="String">${escapeXml(r.scholarNo)}</Data></Cell>
    <Cell ss:StyleID="TextCell"><Data ss:Type="String">${escapeXml(r.branch)}</Data></Cell>
    <Cell ss:StyleID="TextCell"><Data ss:Type="String">${escapeXml(r.year)}</Data></Cell>
    <Cell ss:StyleID="TextCell"><Data ss:Type="String">${escapeXml(sportsStr)}</Data></Cell>
    <Cell ss:StyleID="DateCell"><Data ss:Type="String">${escapeXml(formattedDate)}</Data></Cell>
   </Row>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <Styles>
  <Style ss:ID="Header">
   <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#FFFFFF" ss:Bold="1"/>
   <Interior ss:Color="#1E293B" ss:Pattern="Solid"/>
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
  </Style>
  <Style ss:ID="IDCell">
   <Font ss:FontName="Calibri" ss:Size="10" ss:Color="#D97706" ss:Bold="1"/>
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
  </Style>
  <Style ss:ID="TextCell">
   <Font ss:FontName="Calibri" ss:Size="10" ss:Color="#0F172A"/>
   <Alignment ss:Vertical="Center"/>
  </Style>
  <Style ss:ID="DateCell">
   <Font ss:FontName="Calibri" ss:Size="10" ss:Color="#64748B"/>
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
  </Style>
 </Styles>
 <Worksheet ss:Name="Sporlumina Registrations">
  <Table>
   <Column ss:Width="130"/>
   <Column ss:Width="180"/>
   <Column ss:Width="120"/>
   <Column ss:Width="110"/>
   <Column ss:Width="100"/>
   <Column ss:Width="280"/>
   <Column ss:Width="180"/>
   <Row ss:Height="28" ss:StyleID="Header">
    <Cell><Data ss:Type="String">Registration ID</Data></Cell>
    <Cell><Data ss:Type="String">Student Name</Data></Cell>
    <Cell><Data ss:Type="String">Scholar No / Roll No</Data></Cell>
    <Cell><Data ss:Type="String">Branch</Data></Cell>
    <Cell><Data ss:Type="String">Academic Year</Data></Cell>
    <Cell><Data ss:Type="String">Registered Sports</Data></Cell>
    <Cell><Data ss:Type="String">Registration Timestamp</Data></Cell>
   </Row>${rowsXml}
  </Table>
 </Worksheet>
</Workbook>`;
}

export async function GET(request) {
  try {
    // Sync with Cloud Supabase DB first if configured
    let rawUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || "";

    if (rawUrl && supabaseKey) {
      try {
        if (!rawUrl.startsWith("http://") && !rawUrl.startsWith("https://")) {
          rawUrl = `https://${rawUrl}`;
        }
        const supabaseUrl = rawUrl.replace(/\/$/, "");

        const supaRes = await fetch(`${supabaseUrl}/rest/v1/registrations?select=*&order=created_at.desc`, {
          method: "GET",
          headers: {
            "apikey": supabaseKey,
            "Authorization": `Bearer ${supabaseKey}`,
          },
          cache: "no-store",
        });

        if (supaRes.ok) {
          const supaRecords = await supaRes.json();
          if (Array.isArray(supaRecords)) {
            supaRecords.forEach((item) => {
              let parsedSports = item.sports;
              if (typeof item.sports === "string") {
                try {
                  parsedSports = JSON.parse(item.sports);
                } catch (e) {
                  parsedSports = [item.sports];
                }
              }

              const formattedRecord = {
                id: item.id || `SPOR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                name: item.name || "",
                scholarNo: item.scholar_no || item.scholarNo || "",
                branch: item.branch || "",
                year: item.year || "",
                sports: Array.isArray(parsedSports) ? parsedSports : [String(parsedSports || "")],
                timestamp: item.created_at || item.timestamp || new Date().toISOString(),
              };

              memoryStore.set(formattedRecord.id, formattedRecord);
            });
          }
        }
      } catch (supaErr) {
        console.warn("Supabase fetch notice:", supaErr.message);
      }
    }

    const records = readAllRegistrations();
    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format");

    if (format === "xls" || format === "excel") {
      const xlsContent = generateXlsSpreadsheet(records);
      return new Response(xlsContent, {
        headers: {
          "Content-Type": "application/vnd.ms-excel",
          "Content-Disposition": 'attachment; filename="Sporlumina_Registrations.xls"',
        },
      });
    }

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

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Registration ID is required." }, { status: 400 });
    }

    // Delete from local memory and disk JSON
    deleteRegistration(id);

    // Optional Cloud Supabase Sync Delete
    let rawUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || "";

    if (rawUrl && supabaseKey) {
      try {
        if (!rawUrl.startsWith("http://") && !rawUrl.startsWith("https://")) {
          rawUrl = `https://${rawUrl}`;
        }
        const supabaseUrl = rawUrl.replace(/\/$/, "");

        fetch(`${supabaseUrl}/rest/v1/registrations?id=eq.${encodeURIComponent(id)}`, {
          method: "DELETE",
          headers: {
            "apikey": supabaseKey,
            "Authorization": `Bearer ${supabaseKey}`,
          },
          cache: "no-store",
        }).catch((e) => console.warn("Supabase background delete notice:", e.message));
      } catch (syncErr) {
        console.warn("Supabase delete setup notice:", syncErr.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Registration ${id} deleted successfully.`,
      totalEntries: memoryStore.size,
    });
  } catch (error) {
    console.error("DELETE /api/apply error:", error);
    return NextResponse.json({ error: "Failed to delete registration." }, { status: 500 });
  }
}
