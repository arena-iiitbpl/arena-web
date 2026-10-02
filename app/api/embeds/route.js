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

// Helper to load persisted embeds from local JSON if available
function loadPersistedEmbeds() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(content);
      embedLinksStore = { ...embedLinksStore, ...parsed };
    }
  } catch (err) {
    console.warn("Could not read embed_links.json, using in-memory store.");
  }
}

// Helper to save embeds to local JSON
function savePersistedEmbeds() {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(embedLinksStore, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not write to embed_links.json:", err.message);
  }
}

// Initial load
loadPersistedEmbeds();

export async function GET() {
  loadPersistedEmbeds();
  return NextResponse.json({ success: true, embeds: embedLinksStore });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { sportId, embedUrl, embeds } = body;

    if (embeds && typeof embeds === "object") {
      // Bulk update
      embedLinksStore = { ...embedLinksStore, ...embeds };
    } else if (sportId) {
      // Single update
      embedLinksStore[sportId] = embedUrl || "";
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid payload. Provide sportId or embeds object." },
        { status: 400 }
      );
    }

    savePersistedEmbeds();
    return NextResponse.json({
      success: true,
      message: "Embed link(s) updated successfully",
      embeds: embedLinksStore,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to save embed link" },
      { status: 500 }
    );
  }
}
