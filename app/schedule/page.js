"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovingBackground from "@/components/MovingBackground";
import Link from "next/link";
import { ArrowLeft, ChevronRight, ExternalLink, Trophy } from "lucide-react";

// List of all 11 Sports from Registration Form
const SPORTS = [
  { id: "athletics", name: "Athletics", category: "Physical", icon: "🏃" },
  { id: "badminton", name: "Badminton", category: "Physical", icon: "🏸" },
  { id: "basketball", name: "Basketball", category: "Physical", icon: "🏀" },
  { id: "carrom", name: "Carrom", category: "Indoor", icon: "🎯" },
  { id: "chess", name: "Chess", category: "Indoor", icon: "♟️" },
  { id: "cricket", name: "Cricket", category: "Physical", icon: "🏏" },
  { id: "kabaddi", name: "Kabaddi", category: "Physical", icon: "🤼" },
  { id: "football", name: "Football", category: "Physical", icon: "⚽" },
  { id: "table_tennis", name: "Table Tennis", category: "Indoor", icon: "🏓" },
  { id: "lawn_tennis", name: "Lawn Tennis", category: "Physical", icon: "🎾" },
  { id: "volleyball", name: "Volleyball", category: "Physical", icon: "🏐" },
];

export default function ScheduleMainPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050608] text-white relative">
      <MovingBackground />
      <Navbar />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto w-full relative z-10">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 hover:text-amber-400 transition-colors bg-[#090b0f]/80 px-4 py-2 rounded-full border border-zinc-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12 relative">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-amber-400 block mb-3">
            IIIT BHOPAL • SPORLUMINA 2026
          </span>

          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight font-['Syne'] mb-4 text-white">
            MATCH SCHEDULE & STANDINGS
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 font-['Space_Grotesk'] max-w-xl mx-auto">
            Select a sport discipline from the list below to view its live match schedule, fixtures, and standings page.
          </p>
        </div>

        {/* Vertical List of 11 Sports */}
        <div className="space-y-3">
          {SPORTS.map((sport, index) => (
            <Link
              key={sport.id}
              href={`/schedule/${sport.id}`}
              className="group bg-[#090b0f]/90 backdrop-blur-xl border border-zinc-800/90 rounded-2xl p-5 flex items-center justify-between transition-all duration-300 hover:border-amber-400/80 hover:bg-[#0c0f14] hover:shadow-xl hover:shadow-amber-500/10"
            >
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-zinc-500 font-bold w-6">
                  0{index + 1}
                </span>

                <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {sport.icon}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white font-['Syne'] uppercase group-hover:text-amber-400 transition-colors">
                    {sport.name}
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">
                    {sport.category} Discipline • Sporlumina 2026
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-block text-xs font-mono font-bold uppercase text-zinc-400 group-hover:text-amber-400 transition-colors">
                  View Standings
                </span>
                <div className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-amber-400 group-hover:text-black group-hover:border-amber-400 transition-all">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
