import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = 'force-dynamic';

// In-memory cache & fallback persistence store
let embedLinksStore = {
  cricket: "",
  athletics: "",
  badminton: "",
  basketball: "",
  carrom: "",
  chess: "",
  kabaddi: "",
  football: "",
  table_tennis: "",
  lawn_tennis: "",
  volleyball: "",
};

const DATA_FILE = path.join(process.cwd(), "data", "embed_links.json");

function getSupabaseConfig() {
  let rawUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || "";
  if (rawUrl && supabaseKey) {
    if (!rawUrl.startsWith("http://") && !rawUrl.startsWith("https://")) {
      rawUrl = `https://${rawUrl}`;
    }
    return { url: rawUrl.replace(/\/$/, ""), key: supabaseKey };
  }
  return null;
}

// Load from local JSON
function loadLocalEmbeds() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, "utf-8");
      embedLinksStore = { ...embedLinksStore, ...JSON.parse(content) };
    }
  } catch (err) {}
}

// Save to local JSON
function saveLocalEmbeds() {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(embedLinksStore, null, 2), "utf-8");
  } catch (err) {}
}

loadLocalEmbeds();

export async function GET() {
  loadLocalEmbeds();
  
  const supaConfig = getSupabaseConfig();
  if (supaConfig) {
    try {
      const res = await fetch(`${supaConfig.url}/rest/v1/embeds?select=sport_id,embed_url`, {
        headers: {
          "apikey": supaConfig.key,
          "Authorization": `Bearer ${supaConfig.key}`
        },
        cache: "no-store"
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          data.forEach(row => {
            if (row.sport_id) {
              embedLinksStore[row.sport_id] = row.embed_url || "";
            }
          });
          // Update local JSON with supabase truth
          saveLocalEmbeds();
        }
      }
    } catch (err) {
      console.warn("Supabase fetch error:", err.message);
    }
  }

  return NextResponse.json({ success: true, embeds: embedLinksStore });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { sportId, embedUrl, embeds } = body;
    let updates = [];

    if (embeds && typeof embeds === "object") {
      embedLinksStore = { ...embedLinksStore, ...embeds };
      Object.keys(embeds).forEach(k => {
        updates.push({ sport_id: k, embed_url: embeds[k] || "" });
      });
    } else if (sportId) {
      embedLinksStore[sportId] = embedUrl || "";
      updates.push({ sport_id: sportId, embed_url: embedUrl || "" });
    } else {
      return NextResponse.json({ success: false, error: "Invalid payload." }, { status: 400 });
    }

    saveLocalEmbeds();

    const supaConfig = getSupabaseConfig();
    if (supaConfig && updates.length > 0) {
      try {
        await fetch(`${supaConfig.url}/rest/v1/embeds`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": supaConfig.key,
            "Authorization": `Bearer ${supaConfig.key}`,
            "Prefer": "resolution=merge-duplicates"
          },
          body: JSON.stringify(updates)
        });
      } catch (err) {
        console.warn("Supabase save error:", err.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Embed link(s) updated successfully",
      embeds: embedLinksStore,
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
