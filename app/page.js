import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TwoArenas from "@/components/TwoArenas";
import FeatureCard from "@/components/FeatureCard";
import Footer from "@/components/Footer";
import MovingBackground from "@/components/MovingBackground";
import Link from "next/link";
import { 
  Dumbbell, 
  Gamepad2, 
  Trophy, 
  Sparkles, 
  Cpu, 
  Video, 
  ArrowRight
} from "lucide-react";

export default function Home() {

  // About A.R.E.N.A Pillars
  const aboutPillars = [
    {
      icon: Dumbbell,
      title: "Physical Sports",
      description: "Managing IIIT Bhopal's physical sporting activities, ground setups, equipment logistics, and training regimens.",
      badge: "01 / FIELD",
    },
    {
      icon: Gamepad2,
      title: "Esports Ecosystem",
      description: "Organizing bracketed tournaments, LAN finals, scrims, and digital broadcasts for Valorant, BGMI, and CS2.",
      badge: "02 / SERVER",
    },
    {
      icon: Trophy,
      title: "National Contingent",
      description: "Selecting, training, and fielding IIIT Bhopal's official student contingent for the annual Inter-IIIT Sports Meet.",
      badge: "03 / NATIONAL",
    },
    {
      icon: Sparkles,
      title: "Recreation & Culture",
      description: "Casual gaming nights, turf cups, and sports carnivals hosted across campus including Sporlumina and NIMACK.",
      badge: "04 / COMMUNITY",
    },
    {
      icon: Cpu,
      title: "Technology Systems",
      description: "Custom registration portals, bracket automation, live leaderboard tracking, and digital infrastructure.",
      badge: "05 / SYSTEMS",
    },
    {
      icon: Video,
      title: "Media & Operations",
      description: "Delivering professional live broadcasts, shoutcasting, video highlights, and sponsor brand activations.",
      badge: "06 / BROADCAST",
    },
  ];

  // Official Flagship Events from PPTX
  const flagshipEvents = [
    {
      title: "Sporlumina",
      category: "Flagship Inter-Branch Meet",
      tag: "SPORTS + ESPORTS",
      description: "IIIT Bhopal's highest-footfall multi-day sports & esports festival featuring inter-branch athletics and gaming finals.",
      accent: "amber",
    },
    {
      title: "IEC (Esports Championship)",
      category: "Inter-Branch Championship",
      tag: "DIGITAL SERVER",
      description: "Dedicated esports tournament co-hosted with SPARK featuring online registration, structured brackets, and streaming.",
      accent: "cyan",
    },
    {
      title: "Inter-IIIT Sports Meet",
      category: "National Sports Contingent",
      tag: "NATIONAL STAGE",
      description: "Official IIIT Bhopal athletic contingent competing against premier IIIT institutes nationwide across track, field & indoor sports.",
      accent: "amber",
    },
    {
      title: "Monster x Nodwin Arena",
      category: "Hydration & Gaming Activation",
      tag: "PARTNERSHIP",
      description: "High-stakes BGMI showdown and energy sampling experience powered by Monster Energy - Official Hydration Partner.",
      accent: "cyan",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#050608] text-white relative">
      
      {/* Dynamic Animated Moving Background */}
      <MovingBackground />

      {/* Sticky Translucent Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow relative z-10">
        
        {/* 1. Hero Section (Inspiration Image 1) */}
        <Hero />

        {/* 2. Two Arenas Section (Inspiration Image 2) */}
        <TwoArenas />

        {/* 3. Organization Pillars */}
        <section id="about" className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-zinc-900 scroll-mt-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-zinc-900 gap-6 mb-12">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-[0.25em] block mb-3">
                ORGANIZATION PILLARS
              </span>
              <h2 className="text-4xl sm:text-6xl font-black text-white uppercase font-['Syne'] tracking-tight leading-none">
                THE CORE SYSTEM.
              </h2>
            </div>
            <p className="text-zinc-400 text-sm sm:text-base max-w-md font-['Space_Grotesk'] leading-relaxed">
              One platform connecting physical sports, competitive esports, national contingents, and institute-level sporting activity at IIIT Bhopal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aboutPillars.map((pillar, idx) => (
              <FeatureCard key={idx} {...pillar} />
            ))}
          </div>
        </section>

        {/* 4. Flagship Campus Events (Sporlumina, IEC, Inter-IIIT) */}
        <section className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-zinc-900">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-zinc-900 gap-6 mb-12">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-[0.25em] block mb-3">
                FLAGSHIP EVENTS & CONTINGENT
              </span>
              <h2 className="text-4xl sm:text-6xl font-black text-white uppercase font-['Syne'] tracking-tight leading-none">
                MAJOR INITIATIVES.
              </h2>
            </div>
            <p className="text-zinc-400 text-sm sm:text-base max-w-md font-['Space_Grotesk'] leading-relaxed">
              From our flagship Sporlumina meet to the national Inter-IIIT contingent and IEC Esports Championship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {flagshipEvents.map((evt, idx) => {
              const isAmber = evt.accent === "amber";
              return (
                <div 
                  key={idx}
                  className={`group relative bg-[#090b0f]/80 backdrop-blur-xl p-8 rounded-3xl border border-zinc-800/80 transition-all duration-300 flex flex-col justify-between ${
                    isAmber ? "hover:border-amber-400/50" : "hover:border-cyan-400/50"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                        isAmber ? "bg-amber-500/10 border-amber-500/30 text-amber-400" : "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                      }`}>
                        {evt.tag}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 uppercase">
                        {evt.category}
                      </span>
                    </div>

                    <h3 className={`text-2xl sm:text-3xl font-black text-white font-['Syne'] uppercase mb-3 transition-colors ${
                      isAmber ? "group-hover:text-amber-400" : "group-hover:text-cyan-400"
                    }`}>
                      {evt.title}
                    </h3>

                    <p className="text-zinc-400 text-sm leading-relaxed font-['Space_Grotesk']">
                      {evt.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-zinc-900 flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span>IIIT BHOPAL OFFICIAL</span>
                    <span className={isAmber ? "text-amber-400" : "text-cyan-400"}>A.R.E.N.A Platform</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Final CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-12 border-t border-zinc-900 bg-transparent">
          <div className="max-w-4xl mx-auto text-center bg-[#090b0f]/90 backdrop-blur-xl p-10 sm:p-16 rounded-3xl border border-zinc-800 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-[0.25em] block mb-4">
              JOIN THE SQUAD
            </span>

            <h2 className="text-4xl sm:text-6xl font-black text-white uppercase font-['Syne'] tracking-tight mb-6">
              READY TO STEP INTO THE ARENA?
            </h2>

            <p className="max-w-lg mx-auto text-zinc-400 text-base sm:text-lg mb-10 font-['Space_Grotesk']">
              Discover the student leaders, sports captains, esports directors, and operators behind A.R.E.N.A IIIT Bhopal.
            </p>

            <Link
              href="/team"
              className="inline-flex items-center gap-3 px-10 py-4.5 rounded-full text-base font-extrabold bg-white text-black hover:bg-amber-400 transition-all duration-300 group uppercase tracking-widest font-mono"
            >
              <span>Meet the Team</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
