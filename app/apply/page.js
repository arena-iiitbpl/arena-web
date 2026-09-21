"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovingBackground from "@/components/MovingBackground";
import Link from "next/link";
import { 
  CheckCircle2, 
  ArrowLeft, 
  AlertCircle,
  Loader2,
  Check,
  Download,
  ExternalLink
} from "lucide-react";

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

// Exact list of 11 sports requested by user
const SPORTS_LIST = [
  { id: "athletics", name: "Athletics", category: "Physical" },
  { id: "badminton", name: "Badminton", category: "Physical" },
  { id: "basketball", name: "Basketball", category: "Physical" },
  { id: "carrom", name: "Carrom", category: "Indoor" },
  { id: "chess", name: "Chess", category: "Indoor" },
  { id: "cricket", name: "Cricket", category: "Physical" },
  { id: "kabaddi", name: "Kabaddi", category: "Physical" },
  { id: "football", name: "Football", category: "Physical" },
  { id: "table_tennis", name: "Table Tennis", category: "Indoor" },
  { id: "lawn_tennis", name: "Lawn Tennis", category: "Physical" },
  { id: "volleyball", name: "Volleyball", category: "Physical" },
];

const BRANCH_OPTIONS = ["IT", "MNC", "PNC", "CSE", "AI", "DS", "CS", "CPS", "ECE"];

const YEAR_OPTIONS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "MCA", "MTECH"];

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    name: "",
    scholarNo: "",
    branch: BRANCH_OPTIONS[0],
    year: YEAR_OPTIONS[0],
    selectedSports: [],
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successData, setSuccessData] = useState(null);

  const handleSportToggle = (sportName) => {
    setFormData((prev) => {
      const exists = prev.selectedSports.includes(sportName);
      if (exists) {
        return {
          ...prev,
          selectedSports: prev.selectedSports.filter((s) => s !== sportName),
        };
      } else {
        return {
          ...prev,
          selectedSports: [...prev.selectedSports, sportName],
        };
      }
    });
  };

  const handleSelectAllSports = () => {
    setFormData((prev) => ({
      ...prev,
      selectedSports: SPORTS_LIST.map((s) => s.name),
    }));
  };

  const handleClearSports = () => {
    setFormData((prev) => ({
      ...prev,
      selectedSports: [],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }

    if (!formData.scholarNo.trim()) {
      setErrorMsg("Please enter your Scholar Number.");
      return;
    }

    if (!formData.branch.trim()) {
      setErrorMsg("Please select your Branch.");
      return;
    }

    if (formData.selectedSports.length === 0) {
      setErrorMsg("Please select at least one sport to participate in.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          scholarNo: formData.scholarNo,
          branch: formData.branch,
          year: formData.year,
          sports: formData.selectedSports,
        }),
      });

      let result = null;
      try {
        result = await response.json();
      } catch (e) {
        // Safe fallback if serverless response is not JSON
      }

      if (!response.ok) {
        throw new Error(result?.error || "Failed to submit registration. Please check inputs and try again.");
      }

      if (result && result.registration) {
        setSuccessData(result.registration);
      } else {
        // Fallback client receipt
        setSuccessData({
          id: `SPOR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          name: formData.name,
          scholarNo: formData.scholarNo,
          branch: formData.branch,
          year: formData.year,
          sports: formData.selectedSports,
        });
      }
    } catch (err) {
      setErrorMsg(err.message || "An error occurred during submission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#050608] text-white relative">
      <MovingBackground />
      <Navbar />

      <main className="flex-grow py-14 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto w-full relative z-10">
        
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 hover:text-amber-400 transition-colors bg-[#090b0f]/80 px-4 py-2 rounded-full border border-zinc-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12 relative">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-amber-400 block mb-3">
            IIIT BHOPAL • SPORLUMINA 2026
          </span>

          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight font-['Syne'] mb-4 text-white">
            SPORTS REGISTRATION
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 font-['Space_Grotesk'] max-w-xl mx-auto">
            Apply for upcoming sports disciplines. Select one or multiple sports to represent your branch in Sporlumina.
          </p>
        </div>

        {/* Success Modal / Receipt */}
        {successData ? (
          <div className="bg-[#090b0f]/95 backdrop-blur-xl border border-amber-400/50 rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/40 flex items-center justify-center mx-auto mb-6 text-amber-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 block mb-2">
              REGISTRATION SUCCESSFUL
            </span>

            <h2 className="text-3xl font-black text-white font-['Syne'] uppercase mb-2">
              REGISTRATION CONFIRMED!
            </h2>

            <div className="inline-block px-4 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-400 font-mono text-sm font-bold mb-8">
              ID: {successData.id}
            </div>

            <div className="bg-[#050608] rounded-2xl p-6 text-left border border-zinc-800/80 mb-8 space-y-3 font-['Space_Grotesk'] text-sm">
              <div className="flex justify-between border-b border-zinc-900 pb-2">
                <span className="text-zinc-500 font-mono">Student Name:</span>
                <span className="font-bold text-white">{successData.name}</span>
              </div>

              <div className="flex justify-between border-b border-zinc-900 pb-2">
                <span className="text-zinc-500 font-mono">Scholar Number:</span>
                <span className="font-bold text-white font-mono">{successData.scholarNo}</span>
              </div>

              <div className="flex justify-between border-b border-zinc-900 pb-2">
                <span className="text-zinc-500 font-mono">Branch:</span>
                <span className="font-bold text-white uppercase">{successData.branch}</span>
              </div>

              <div className="flex justify-between border-b border-zinc-900 pb-2">
                <span className="text-zinc-500 font-mono">Academic Year / Course:</span>
                <span className="font-bold text-white">{successData.year}</span>
              </div>

              <div>
                <span className="text-zinc-500 font-mono block mb-2">Registered Sports ({successData.sports.length}):</span>
                <div className="flex flex-wrap gap-2">
                  {successData.sports.map((s, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 font-mono text-xs font-bold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Instagram QR Code & Community Card */}
            <div className="bg-gradient-to-br from-purple-950/40 via-pink-950/30 to-amber-950/40 border border-pink-500/40 rounded-3xl p-6 sm:p-8 mb-8 text-center flex flex-col items-center shadow-xl shadow-pink-500/5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-pink-400 block mb-2">
                OFFICIAL INSTAGRAM COMMUNITY
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white font-['Syne'] uppercase mb-4">
                SCAN QR & FOLLOW @ARENA_IIITB
              </h3>

              {/* QR Image Container */}
              <div className="relative w-48 h-48 bg-white p-3 rounded-2xl shadow-2xl shadow-pink-500/20 mb-5 border border-pink-400/50 group hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/instagram-qr.jpg"
                  alt="A.R.E.N.A Instagram QR Code - @arena_iiitb"
                  width={192}
                  height={192}
                  className="w-full h-full object-contain rounded-xl"
                  priority
                />
              </div>

              <p className="text-xs text-zinc-300 font-['Space_Grotesk'] max-w-sm mb-5 leading-relaxed">
                Scan with your camera or click the button below to get real-time Sporlumina 2026 match updates, fixtures, and highlights!
              </p>

              <a
                href="https://www.instagram.com/arena_iiitb?stkn=OGR5ZHphMWYwaTE2"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-extrabold text-xs uppercase tracking-widest font-mono hover:opacity-95 transition-all duration-300 shadow-lg shadow-pink-500/25 group"
              >
                <InstagramIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Follow A.R.E.N.A on Instagram</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>

            {/* Receipt Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-widest font-mono hover:bg-amber-400 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Save / Print Receipt</span>
              </button>

              <button
                onClick={() => {
                  setSuccessData(null);
                  setFormData({
                    name: "",
                    scholarNo: "",
                    branch: BRANCH_OPTIONS[0],
                    year: YEAR_OPTIONS[0],
                    selectedSports: [],
                  });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-xs font-bold uppercase tracking-widest hover:text-white hover:border-zinc-700"
              >
                <span>Register Another Student</span>
              </button>
            </div>
          </div>
        ) : (
          /* Main Application Form */
          <form 
            onSubmit={handleSubmit}
            className="bg-[#090b0f]/90 backdrop-blur-xl border border-zinc-800/90 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8"
          >
            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Personal Details Section */}
            <div className="space-y-6">
              <div className="border-b border-zinc-900 pb-3 flex items-center justify-between">
                <h3 className="text-base font-bold font-['Syne'] uppercase text-amber-400 tracking-wider">
                  01 // STUDENT CREDENTIALS
                </h3>
                <span className="text-[10px] font-mono text-zinc-500">REQUIRED</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aditya Shriwastav"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#050608] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors font-['Space_Grotesk']"
                  />
                </div>

                {/* Scholar Number */}
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Scholar Number / Roll No *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 23111001"
                    value={formData.scholarNo}
                    onChange={(e) => setFormData({ ...formData, scholarNo: e.target.value })}
                    className="w-full bg-[#050608] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Selectable Branch Field */}
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Branch *
                  </label>
                  <select
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full bg-[#050608] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors font-['Space_Grotesk'] cursor-pointer"
                  >
                    {BRANCH_OPTIONS.map((b, idx) => (
                      <option key={idx} value={b} className="bg-[#050608] text-white">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Academic Year / Course Field */}
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Academic Year / Course *
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full bg-[#050608] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors font-['Space_Grotesk'] cursor-pointer"
                  >
                    {YEAR_OPTIONS.map((y, idx) => (
                      <option key={idx} value={y} className="bg-[#050608] text-white">
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Multivalued Sports Selection Section */}
            <div className="space-y-6 pt-4">
              <div className="border-b border-zinc-900 pb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold font-['Syne'] uppercase text-amber-400 tracking-wider">
                    02 // SPORTS SELECTION (MULTIVALUED)
                  </h3>
                  <p className="text-xs text-zinc-400 font-['Space_Grotesk']">
                    Select one or multiple sports you want to participate in.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSelectAllSports}
                    className="text-[10px] font-mono uppercase text-amber-400 hover:underline px-2 py-1"
                  >
                    Select All
                  </button>
                  <span className="text-zinc-700">|</span>
                  <button
                    type="button"
                    onClick={handleClearSports}
                    className="text-[10px] font-mono uppercase text-zinc-500 hover:text-zinc-300 px-2 py-1"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Selection Counter */}
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>AVAILABLE SPORTS:</span>
                <span className="font-bold text-amber-400">
                  {formData.selectedSports.length} Sports Selected
                </span>
              </div>

              {/* Sports Grid Multivalued Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {SPORTS_LIST.map((sport) => {
                  const isSelected = formData.selectedSports.includes(sport.name);
                  return (
                    <button
                      key={sport.id}
                      type="button"
                      onClick={() => handleSportToggle(sport.name)}
                      className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[90px] relative overflow-hidden group ${
                        isSelected
                          ? "bg-amber-400/10 border-amber-400 text-white shadow-lg shadow-amber-500/10"
                          : "bg-[#050608] border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          isSelected ? "bg-amber-400 text-black" : "bg-zinc-900 text-zinc-500"
                        }`}>
                          {sport.category}
                        </span>

                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                          isSelected ? "bg-amber-400 border-amber-400 text-black" : "border-zinc-700 group-hover:border-zinc-500"
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>

                      <span className="text-sm font-bold font-['Syne'] uppercase tracking-tight">
                        {sport.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-zinc-900">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-white text-black hover:bg-amber-400 font-extrabold text-sm uppercase tracking-widest font-mono transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-white/5 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>RECORDING REGISTRATION...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-amber-400" />
                    <span>SUBMIT SPORLUMINA REGISTRATION</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </main>

      <Footer />
    </div>
  );
}
