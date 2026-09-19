import fs from "fs";
import path from "path";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamCard from "@/components/TeamCard";
import MovingBackground from "@/components/MovingBackground";
import Link from "next/link";
import { Users, FolderPlus, ArrowLeft, Sparkles } from "lucide-react";

export const revalidate = 0;

function formatNameFromFilename(filename) {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  const cleanString = nameWithoutExt.replace(/[-_]+/g, " ");
  return cleanString
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function getTeamMembers() {
  try {
    const teamDir = path.join(process.cwd(), "public", "team");
    if (!fs.existsSync(teamDir)) return [];

    const files = fs.readdirSync(teamDir);
    const validImageExts = [".jpg", ".jpeg", ".png", ".webp", ".svg", ".avif"];

    return files
      .filter((file) => {
        if (file.startsWith(".")) return false;
        const ext = path.extname(file).toLowerCase();
        return validImageExts.includes(ext);
      })
      .map((file) => ({
        id: file,
        filename: file,
        name: formatNameFromFilename(file),
        imageSrc: `/team/${encodeURIComponent(file)}`,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Failed to read team directory:", error);
    return [];
  }
}

export const metadata = {
  title: "Meet the Team | A.R.E.N.A – IIIT Bhopal",
  description: "Meet the student leaders, sports captains, esports directors, and operators behind A.R.E.N.A at IIIT Bhopal.",
};

export default function TeamPage() {
  const members = getTeamMembers();

  return (
    <div className="flex flex-col min-h-screen bg-[#050608] text-white relative">
      {/* Dynamic Animated Moving Background */}
      <MovingBackground />

      {/* Navbar */}
      <Navbar />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full relative z-10">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 hover:text-amber-400 transition-colors bg-[#090b0f]/80 px-4 py-2 rounded-full border border-zinc-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-16 relative">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-amber-400 block mb-3">
            A.R.E.N.A DIRECTORY
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight font-['Syne'] mb-4 text-white">
            Meet the Team
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 font-['Space_Grotesk'] max-w-2xl mx-auto">
            The people behind A.R.E.N.A.
          </p>
        </div>

        {/* Team Grid */}
        {members.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {members.map((member) => (
              <TeamCard
                key={member.id}
                name={member.name}
                imageSrc={member.imageSrc}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[#090b0f]/90 rounded-3xl p-12 text-center max-w-2xl mx-auto border border-zinc-800">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto mb-4 text-amber-400">
              <FolderPlus className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white font-['Syne'] mb-2">
              No Team Members Found
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-['Space_Grotesk']">
              Drop team photos into the <code className="bg-black px-2 py-1 rounded text-amber-400 font-mono text-xs">/public/team/</code> folder and they will automatically appear here!
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-zinc-400 bg-black px-4 py-2 rounded-xl border border-zinc-800">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Automatic Filename Detection Active</span>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
