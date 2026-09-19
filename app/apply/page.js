"use client";

import { useState } from "react";
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
  Download
} from "lucide-react";

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

const YEAR_OPTIONS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    name: "",
    scholarNo: "",
    branch: "",
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
      setErrorMsg("Please enter your Branch.");
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

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit registration.");
      }

      setSuccessData(result.registration);
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
                <span className="font-bold text-white">{successData.branch}</span>
              </div>

              <div className="flex justify-between border-b border-zinc-900 pb-2">
                <span className="text-zinc-500 font-mono">Academic Year:</span>
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

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-widest font-mono hover:bg-amber-400 transition-colors"
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
                    branch: "",
                    year: YEAR_OPTIONS[0],
                    selectedSports: [],
                  });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-xs font-bold uppercase tracking-widest hover:text-white hover:border-zinc-700"
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
                {/* Writable Branch Field */}
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Branch *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CSE, IT, ECE, AI & DS"
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full bg-[#050608] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors font-['Space_Grotesk']"
                  />
                </div>

                {/* Academic Year */}
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Academic Year *
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full bg-[#050608] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors font-['Space_Grotesk']"
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
                className="w-full py-4 rounded-full bg-white text-black hover:bg-amber-400 font-extrabold text-sm uppercase tracking-widest font-mono transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-white/5 disabled:opacity-50"
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
