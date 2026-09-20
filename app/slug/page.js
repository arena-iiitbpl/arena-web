"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovingBackground from "@/components/MovingBackground";
import { 
  Lock, 
  ShieldCheck, 
  Trash2, 
  Download, 
  RefreshCw, 
  LogOut, 
  Search, 
  Filter, 
  AlertCircle,
  CheckCircle2,
  Users,
  Trophy,
  Loader2,
  Building2
} from "lucide-react";

export default function SlugAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard state
  const [registrations, setRegistrations] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("ALL");
  const [deleteTarget, setDeleteTarget] = useState(null); // Record to delete
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [actionNotice, setActionNotice] = useState("");

  // Check existing session on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("slug_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
      fetchRegistrations();
    } else {
      setLoadingData(false);
    }
  }, []);

  const fetchRegistrations = async () => {
    setLoadingData(true);
    try {
      const res = await fetch("/api/apply");
      const data = await res.json();
      if (data && Array.isArray(data.registrations)) {
        setRegistrations(data.registrations);
      }
    } catch (err) {
      console.error("Failed to fetch registrations:", err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const res = await fetch("/api/slug/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameInput.trim(),
          password: passwordInput.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("slug_auth", "true");
        fetchRegistrations();
      } else {
        setLoginError(data.error || "Invalid Username or Password.");
      }
    } catch (err) {
      setLoginError("Connection error during login. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("slug_auth");
    document.cookie = "slug_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    setUsernameInput("");
    setPasswordInput("");
  };

  const handleDeleteRecord = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);

    try {
      const res = await fetch(`/api/apply?id=${encodeURIComponent(deleteTarget.id)}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setRegistrations((prev) => prev.filter((r) => r.id !== deleteTarget.id));
        setActionNotice(`Successfully deleted registration ${deleteTarget.id}`);
        setTimeout(() => setActionNotice(""), 4000);
      } else {
        alert(data.error || "Failed to delete entry.");
      }
    } catch (err) {
      alert("Error deleting entry from server.");
    } finally {
      setDeleteLoading(false);
      setDeleteTarget(null);
    }
  };

  // Filter registrations based on search term & branch
  const filteredRegistrations = registrations.filter((r) => {
    const matchesSearch =
      (r.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.scholarNo || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.branch || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.id || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(r.sports) && r.sports.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesBranch =
      selectedBranch === "ALL" || (r.branch || "").toUpperCase() === selectedBranch.toUpperCase();

    return matchesSearch && matchesBranch;
  });

  // Calculate analytics
  const uniqueBranches = Array.from(
    new Set(registrations.map((r) => (r.branch || "").trim().toUpperCase()).filter(Boolean))
  );

  const sportsFrequency = {};
  registrations.forEach((r) => {
    if (Array.isArray(r.sports)) {
      r.sports.forEach((s) => {
        sportsFrequency[s] = (sportsFrequency[s] || 0) + 1;
      });
    }
  });

  const sortedSports = Object.entries(sportsFrequency).sort((a, b) => b[1] - a[1]);
  const topSport = sortedSports.length > 0 ? sortedSports[0][0] : "N/A";

  return (
    <div className="flex flex-col min-h-screen bg-[#050608] text-white relative">
      <MovingBackground />
      <Navbar />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full relative z-10">
        {!isAuthenticated ? (
          /* Authorized Admin Login Modal */
          <div className="max-w-md mx-auto my-12">
            <div className="bg-[#090b0f]/95 backdrop-blur-2xl border border-amber-400/40 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto mb-6 text-amber-400 shadow-lg shadow-amber-500/10">
                <Lock className="w-8 h-8" />
              </div>

              <div className="text-center mb-8">
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-amber-400 block mb-2">
                  AUTHORIZED PERSONNEL ONLY
                </span>
                <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight font-['Syne'] text-white">
                  ADMIN CONTROL DESK
                </h1>
                <p className="text-xs text-zinc-400 mt-2 font-['Space_Grotesk']">
                  Enter credentials to access Sporlumina 2026 student registrations database.
                </p>
              </div>

              {loginError && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter admin username"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className="w-full bg-[#050608] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full bg-[#050608] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-4 rounded-xl bg-amber-400 text-black font-extrabold text-xs uppercase tracking-widest font-mono hover:bg-amber-300 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 disabled:opacity-50 mt-4"
                >
                  {loginLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>AUTHENTICATING...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>UNLOCK ADMIN DESK</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-zinc-900 text-center text-[10px] font-mono text-zinc-500">
                IIIT BHOPAL • SPORLUMINA 2026 DATABASE SYSTEM
              </div>
            </div>
          </div>
        ) : (
          /* Authenticated Admin Control Desk Dashboard */
          <div className="space-y-8">
            {/* Header Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#090b0f]/90 backdrop-blur-xl border border-zinc-800 p-6 rounded-3xl">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
                    AUTHORIZED ACCESS • CONTROL DESK
                  </span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-black uppercase font-['Syne'] text-white">
                  REGISTRATION DATABASE
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={fetchRegistrations}
                  disabled={loadingData}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
                  title="Refresh table data"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingData ? "animate-spin" : ""}`} />
                  <span>Refresh</span>
                </button>

                <a
                  href="/api/apply?format=csv"
                  download="Sporlumina_Registrations.csv"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/10"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </a>

                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 font-mono text-xs font-bold transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Notification Toast */}
            {actionNotice && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-3 animate-fade-in">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>{actionNotice}</span>
              </div>
            )}

            {/* Analytics Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#090b0f]/90 border border-zinc-800 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                    TOTAL APPLICANTS
                  </span>
                  <span className="text-2xl font-black font-mono text-white">
                    {registrations.length}
                  </span>
                </div>
              </div>

              <div className="bg-[#090b0f]/90 border border-zinc-800 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                    UNIQUE BRANCHES
                  </span>
                  <span className="text-2xl font-black font-mono text-white">
                    {uniqueBranches.length}
                  </span>
                </div>
              </div>

              <div className="bg-[#090b0f]/90 border border-zinc-800 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                    MOST POPULAR SPORT
                  </span>
                  <span className="text-lg font-bold font-mono text-white truncate max-w-[150px] block">
                    {topSport}
                  </span>
                </div>
              </div>

              <div className="bg-[#090b0f]/90 border border-zinc-800 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-400/10 border border-purple-400/30 flex items-center justify-center text-purple-400 flex-shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                    SYSTEM STATUS
                  </span>
                  <span className="text-xs font-bold font-mono text-emerald-400 uppercase block mt-1">
                    SUPABASE ACTIVE
                  </span>
                </div>
              </div>
            </div>

            {/* Controls: Search and Branch Filter */}
            <div className="bg-[#090b0f]/90 border border-zinc-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search student, scholar no, branch, sport..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#050608] border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-['Space_Grotesk']"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-zinc-500" />
                <span className="text-xs font-mono text-zinc-400">Branch:</span>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="bg-[#050608] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                >
                  <option value="ALL">All Branches ({uniqueBranches.length})</option>
                  {uniqueBranches.map((b, idx) => (
                    <option key={idx} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Registrations Data Table */}
            <div className="bg-[#090b0f]/90 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-[#050608]/80 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                      <th className="py-4 px-6">ID</th>
                      <th className="py-4 px-6">Student Name</th>
                      <th className="py-4 px-6">Scholar No</th>
                      <th className="py-4 px-6">Branch</th>
                      <th className="py-4 px-6">Year</th>
                      <th className="py-4 px-6">Sports Selected</th>
                      <th className="py-4 px-6">Date</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900 text-xs font-['Space_Grotesk']">
                    {loadingData ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-zinc-500 font-mono">
                          <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-amber-400" />
                          <span>FETCHING REGISTRATION DATA...</span>
                        </td>
                      </tr>
                    ) : filteredRegistrations.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-zinc-500 font-mono">
                          NO REGISTRATION ENTRIES FOUND
                        </td>
                      </tr>
                    ) : (
                      filteredRegistrations.map((record) => (
                        <tr
                          key={record.id}
                          className="hover:bg-zinc-900/50 transition-colors group"
                        >
                          <td className="py-4 px-6 font-mono font-bold text-amber-400">
                            {record.id}
                          </td>
                          <td className="py-4 px-6 font-bold text-white">
                            {record.name}
                          </td>
                          <td className="py-4 px-6 font-mono text-zinc-300">
                            {record.scholarNo}
                          </td>
                          <td className="py-4 px-6 font-mono text-zinc-300 uppercase">
                            <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold">
                              {record.branch}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-zinc-400">
                            {record.year}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex flex-wrap gap-1.5 max-w-xs">
                              {Array.isArray(record.sports) &&
                                record.sports.map((sport, sIdx) => (
                                  <span
                                    key={sIdx}
                                    className="px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 font-mono text-[10px] font-bold"
                                  >
                                    {sport}
                                  </span>
                                ))}
                            </div>
                          </td>
                          <td className="py-4 px-6 font-mono text-[11px] text-zinc-500">
                            {record.timestamp
                              ? new Date(record.timestamp).toLocaleDateString("en-IN", {
                                  day: "2-digit",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : "N/A"}
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button
                              onClick={() => setDeleteTarget(record)}
                              className="inline-flex items-center justify-center p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200"
                              title="Delete Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="bg-[#090b0f] border border-red-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold font-['Syne'] uppercase text-white mb-2">
                  CONFIRM DELETION
                </h3>
                <p className="text-xs text-zinc-400 font-['Space_Grotesk']">
                  Are you sure you want to delete registration{" "}
                  <strong className="text-amber-400 font-mono">{deleteTarget.id}</strong> for{" "}
                  <strong className="text-white">{deleteTarget.name}</strong>?
                </p>
                <p className="text-[11px] text-red-400 font-mono mt-2">
                  This record will be permanently removed from memory, local JSON, and Supabase.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  disabled={deleteLoading}
                  className="w-1/2 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-xs font-bold uppercase hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteRecord}
                  disabled={deleteLoading}
                  className="w-1/2 py-3 rounded-xl bg-red-500 text-white font-mono text-xs font-bold uppercase hover:bg-red-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 disabled:opacity-50"
                >
                  {deleteLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>Delete Entry</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
