"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovingBackground from "@/components/MovingBackground";
import { ArrowLeft, ExternalLink, Settings, Check, Sparkles } from "lucide-react";

// Master list of 11 Sports from Registration Form
const SPORTS_DATA = {
  athletics: { name: "Athletics", category: "Physical", icon: "🏃", defaultUrl: "" },
  badminton: { name: "Badminton", category: "Physical", icon: "🏸", defaultUrl: "" },
  basketball: { name: "Basketball", category: "Physical", icon: "🏀", defaultUrl: "" },
  carrom: { name: "Carrom", category: "Indoor", icon: "🎯", defaultUrl: "" },
  chess: { name: "Chess", category: "Indoor", icon: "♟️", defaultUrl: "" },
  cricket: { name: "Cricket", category: "Physical", icon: "🏏", defaultUrl: "" },
  kabaddi: { name: "Kabaddi", category: "Physical", icon: "🤼", defaultUrl: "" },
  football: { name: "Football", category: "Physical", icon: "⚽", defaultUrl: "" },
  table_tennis: { name: "Table Tennis", category: "Indoor", icon: "🏓", defaultUrl: "" },
  lawn_tennis: { name: "Lawn Tennis", category: "Physical", icon: "🎾", defaultUrl: "" },
  volleyball: { name: "Volleyball", category: "Physical", icon: "🏐", defaultUrl: "" },
};

export default function SportEmbedPage() {
  const params = useParams();
  const sportId = params?.sportId;
  const sport = SPORTS_DATA[sportId] || {
    name: sportId ? sportId.toUpperCase().replace("_", " ") : "Sport",
    category: "Discipline",
    icon: "🏆",
    defaultUrl: "",
  };

  const [embedUrl, setEmbedUrl] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Robust helper to extract clean URL from pasted iframe code, wrapped div code, or raw URL
  const extractUrl = (rawInput) => {
    if (!rawInput) return "";
    const cleaned = rawInput.trim();
    if (cleaned.toLowerCase().includes("src=")) {
      const match = cleaned.match(/src=["']?([^"'\s>]+)["']?/i);
      if (match && match[1]) {
        let url = match[1].replace(/^["']|["']$/g, "");
        if (url.startsWith("//")) url = "https:" + url;
        if (url.startsWith("http://") || url.startsWith("https://")) {
          return url;
        }
      }
    }
    return cleaned;
  };

  useEffect(() => {
    if (sportId) {
      // First check local storage
      const saved = localStorage.getItem(`arena_embed_${sportId}`);
      if (saved) {
        setEmbedUrl(saved);
        setInputUrl(saved);
      } else if (sport.defaultUrl) {
        setEmbedUrl(sport.defaultUrl);
        setInputUrl(sport.defaultUrl);
      }

      // Fetch latest from API
      fetch("/api/embeds")
        .then((res) => res.json())
        .then((data) => {
          if (data && data.embeds && data.embeds[sportId]) {
            const apiUrl = data.embeds[sportId];
            setEmbedUrl(apiUrl);
            setInputUrl(apiUrl);
            localStorage.setItem(`arena_embed_${sportId}`, apiUrl);
          }
        })
        .catch((err) => console.log("Embed API check skipped:", err));
    }
  }, [sportId, sport.defaultUrl]);

  const handleSaveUrl = async (e) => {
    e?.preventDefault();
    const finalUrl = extractUrl(inputUrl);
    setEmbedUrl(finalUrl);
    if (sportId) {
      localStorage.setItem(`arena_embed_${sportId}`, finalUrl);
      try {
        await fetch("/api/embeds", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sportId, embedUrl: finalUrl }),
        });
      } catch (err) {
        console.error("Failed to post embed URL to backend API:", err);
      }
    }
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#050608] text-white relative">
      <MovingBackground />
      <Navbar />

      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
        {/* Navigation & Controls Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-[#090b0f]/80 backdrop-blur-md p-4 rounded-2xl border border-zinc-800">
          <div className="flex items-center gap-3">
            <Link
              href="/schedule"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 hover:text-amber-400 transition-colors bg-zinc-900 px-3.5 py-2 rounded-xl border border-zinc-800 hover:border-amber-400/50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Sports</span>
            </Link>

            <div className="h-6 w-px bg-zinc-800 hidden sm:block" />

            <div className="flex items-center gap-3">
              <span className="text-2xl">{sport.icon}</span>
              <div>
                <h1 className="text-lg sm:text-xl font-bold font-['Syne'] uppercase text-white tracking-wide">
                  {sport.name} Standings & Schedule
                </h1>
                <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                  {sport.category} Discipline • Sporlumina 2026
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 hover:text-black bg-amber-400/10 hover:bg-amber-400 px-3.5 py-2 rounded-xl border border-amber-400/40 transition-all"
            >
              <Settings className="w-4 h-4" />
              <span>{isEditing ? "Close Editor" : "Paste / Update Link"}</span>
            </button>

            {embedUrl && (
              <a
                href={embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 hover:text-white bg-zinc-900 px-3.5 py-2 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">Open Direct Link</span>
              </a>
            )}
          </div>
        </div>

        {/* Link Input Drawer */}
        {(isEditing || !embedUrl) && (
          <div className="mb-6 bg-[#0c0e14] border border-amber-500/30 rounded-2xl p-5 shadow-2xl shadow-amber-500/5 transition-all">
            <div className="flex items-center gap-2 mb-3 text-amber-400">
              <Sparkles className="w-4 h-4" />
              <h2 className="text-sm font-bold uppercase tracking-wider font-mono">
                {embedUrl ? "Update Embed Link for " + sport.name : "Embed Standings for " + sport.name}
              </h2>
            </div>
            <p className="text-xs text-zinc-400 mb-4 font-['Space_Grotesk']">
              Paste the iframe URL or HTML embed snippet provided for {sport.name} standings.
            </p>
            <form onSubmit={handleSaveUrl} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder='Paste iframe src URL or iframe code e.g. <iframe src="https://..."></iframe>'
                className="flex-grow bg-[#050608] border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 font-mono text-xs"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-mono font-bold text-xs uppercase px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-amber-500/20 whitespace-nowrap"
              >
                Save & Display
              </button>
            </form>
          </div>
        )}

        {/* Saved Success Notification */}
        {savedSuccess && (
          <div className="mb-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 flex items-center gap-2 text-emerald-400 text-xs font-mono">
            <Check className="w-4 h-4" />
            <span>Embed URL saved successfully for {sport.name}!</span>
          </div>
        )}

        {/* Embed Display Container */}
        <div className="bg-[#090b0f] border border-zinc-800 rounded-2xl overflow-hidden min-h-[70vh] flex flex-col shadow-2xl relative">
          {embedUrl ? (
            <div 
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '100%',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch'
              }}
              className="w-full flex-grow min-h-[75vh]"
            >
              <iframe
                src={embedUrl}
                title={`${sport.name} Standings & Schedule`}
                width="100%"
                height="650"
                frameBorder="0"
                scrolling="no"
                style={{ width: '1px', minWidth: '100%', minHeight: '75vh', border: 'none' }}
                className="w-full flex-grow border-0 rounded-2xl bg-white"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="flex-grow min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-[#07090d] relative overflow-hidden">
              <div className="w-20 h-20 rounded-3xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-4xl mb-5 shadow-xl shadow-amber-500/5">
                {sport.icon}
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 font-mono text-[10px] font-bold uppercase tracking-widest mb-4">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>SCHEDULE NOT UPDATED YET</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black font-['Syne'] uppercase text-white mb-3 tracking-wide">
                SCHEDULE NOT UPDATED
              </h2>

              <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mb-8 font-['Space_Grotesk'] leading-relaxed">
                The official match schedule and standings fixture for <strong className="text-white">{sport.name}</strong> have not been updated by the event coordinators yet. Please check back soon.
              </p>

              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-amber-400 hover:border-amber-400/50 font-mono text-xs font-bold uppercase px-5 py-2.5 rounded-xl transition-all"
              >
                <span>Admin: Add Embed Link</span>
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
