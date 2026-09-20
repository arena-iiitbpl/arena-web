import fs from "fs";
import path from "path";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamCard from "@/components/TeamCard";
import MovingBackground from "@/components/MovingBackground";
import Link from "next/link";
import { ArrowLeft, Sparkles, FolderPlus } from "lucide-react";

export const revalidate = 0;

// Preferred order matching Arena Final.pptx slides 17-23
const PREFERRED_TEAM_ORDER = [
  "Faculty In-Charge",
  "Core Executive Council",
  "Tech Team",
  "Operations & Esports",
  "Event Coordinators",
  "Media & Design",
  "PG Volunteers",
];

function parseMemberFile(fileName, subPath = "") {
  const ext = path.extname(fileName);
  const nameWithoutExt = path.basename(fileName, ext);

  let name = nameWithoutExt;
  let post = "A.R.E.N.A Team";

  // Parse "Name,Post.ext" format
  if (nameWithoutExt.includes(",")) {
    const parts = nameWithoutExt.split(",");
    name = parts[0].trim();
    post = parts.slice(1).join(",").trim();
  } else {
    name = nameWithoutExt
      .replace(/[-_]+/g, " ")
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  const relativeUrl = subPath
    ? `/team/${encodeURIComponent(subPath)}/${encodeURIComponent(fileName)}`
    : `/team/${encodeURIComponent(fileName)}`;

  return {
    id: subPath ? `${subPath}/${fileName}` : fileName,
    filename: fileName,
    name,
    post,
    imageSrc: relativeUrl,
  };
}

function getTeamCategories() {
  try {
    const teamDir = path.join(process.cwd(), "public", "team");
    if (!fs.existsSync(teamDir)) return [];

    const validExts = [".jpg", ".jpeg", ".png", ".webp", ".svg", ".avif"];
    const items = fs.readdirSync(teamDir, { withFileTypes: true });

    const categoryMap = new Map();

    items.forEach((item) => {
      if (item.name.startsWith(".")) return;

      if (item.isDirectory()) {
        const catName = item.name;
        const catDir = path.join(teamDir, catName);
        const files = fs.readdirSync(catDir);

        const members = files
          .filter((f) => !f.startsWith(".") && validExts.includes(path.extname(f).toLowerCase()))
          .map((f) => parseMemberFile(f, catName));

        if (members.length > 0) {
          categoryMap.set(catName, members);
        }
      } else if (item.isFile()) {
        const ext = path.extname(item.name).toLowerCase();
        if (validExts.includes(ext)) {
          const defaultCat = "A.R.E.N.A Core Team";
          if (!categoryMap.has(defaultCat)) {
            categoryMap.set(defaultCat, []);
          }
          categoryMap.get(defaultCat).push(parseMemberFile(item.name));
        }
      }
    });

    const orderedCategories = [];

    PREFERRED_TEAM_ORDER.forEach((catName) => {
      if (categoryMap.has(catName)) {
        orderedCategories.push({
          categoryName: catName,
          members: categoryMap.get(catName),
        });
        categoryMap.delete(catName);
      }
    });

    for (const [catName, members] of categoryMap.entries()) {
      orderedCategories.push({
        categoryName: catName,
        members,
      });
    }

    return orderedCategories;
  } catch (error) {
    console.error("Failed to read team directories:", error);
    return [];
  }
}

export const metadata = {
  title: "Meet the Team | A.R.E.N.A – IIIT Bhopal",
  description: "Meet the faculty, executive council, tech team, coordinators, and volunteers behind A.R.E.N.A at IIIT Bhopal.",
};

export default function TeamPage() {
  const categories = getTeamCategories();
  const totalMembers = categories.reduce((sum, cat) => sum + cat.members.length, 0);

  return (
    <div className="flex flex-col min-h-screen bg-[#050608] text-white relative">
      <MovingBackground />
      <Navbar />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full relative z-10">
        
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 hover:text-amber-400 transition-colors bg-[#090b0f]/80 px-4 py-2 rounded-full border border-zinc-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-amber-400 block mb-3">
            A.R.E.N.A DIRECTORY
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight font-['Syne'] mb-4 text-white">
            MEET THE TEAM
          </h1>

          <p className="text-base sm:text-xl text-zinc-400 font-['Space_Grotesk'] max-w-2xl mx-auto">
            The faculty in-charge, executive council, tech coordinators, media team, and volunteers behind A.R.E.N.A & Sporlumina 2026.
          </p>
        </div>

        {/* Categorized Team Sections */}
        {categories.length > 0 ? (
          <div className="space-y-20">
            {categories.map((cat, idx) => (
              <section key={cat.categoryName} className="space-y-8">
                {/* Team Category Title Header */}
                <div className="border-b border-zinc-800/80 pb-4">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-amber-400 block mb-1">
                    0{idx + 1} // TEAM CATEGORY
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight font-['Syne'] text-white">
                    {cat.categoryName}
                  </h2>
                </div>

                {/* Member Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                  {cat.members.map((member) => (
                    <TeamCard
                      key={member.id}
                      name={member.name}
                      post={member.post}
                      imageSrc={member.imageSrc}
                    />
                  ))}
                </div>
              </section>
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
              Drop team photos formatted as <code className="bg-black px-2 py-1 rounded text-amber-400 font-mono text-xs">Name,Post.jpg</code> into team subfolders inside <code className="bg-black px-2 py-1 rounded text-amber-400 font-mono text-xs">/public/team/</code>!
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-zinc-400 bg-black px-4 py-2 rounded-xl border border-zinc-800">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Automatic Team Category & Post Detection Active</span>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
