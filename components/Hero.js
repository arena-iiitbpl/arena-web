import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ClipboardList, Users } from "lucide-react";

export default function Hero() {
  const tickerItems = [
    "PHYSICAL SPORT",
    "COMPETITIVE ESPORTS",
    "SPORLUMINA 2026 REGISTRATION OPEN",
    "OPERATIONS",
    "MEDIA",
    "TECHNOLOGY",
    "ATHLETICS",
    "COMMUNITY",
  ];

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between pt-8 pb-0 px-4 sm:px-6 lg:px-12 bg-transparent overflow-hidden">
      
      {/* Subtle Circular Wireframe Detail */}
      <div className="absolute top-1/4 left-10 w-[450px] h-[450px] rounded-full border border-amber-500/10 pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[350px] rounded-[100%] border border-cyan-500/10 pointer-events-none" />

      {/* Top Header Meta Row */}
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto z-10 text-xs font-mono tracking-[0.2em] text-zinc-400 uppercase pt-4 border-b border-zinc-900/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 relative rounded overflow-hidden bg-black border border-zinc-800">
            <Image src="/logo.jpg" alt="Logo" fill className="object-contain" />
          </div>
          <span>ASSOCIATION FOR RECREATION, ESPORTS, AND ATHLETICS</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>IIIT BHOPAL</span>
        </div>
      </div>

      {/* Center Main Headline Section */}
      <div className="relative max-w-7xl mx-auto w-full my-auto py-12 z-10 flex flex-col items-start">
        
        {/* Giant Futuristic Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[105px] font-black tracking-tighter leading-[0.9] text-white uppercase font-['Syne'] text-left">
          BUILD THE <br />
          GAME <br />
          <span className="relative inline-block my-1">
            <span className="text-stroke-bold font-['Syne']">BEYOND</span>
            <span className="absolute bottom-1 left-0 w-full h-[4px] sm:h-[6px] amber-glow-bar" />
          </span> <br />
          THE GAME.
        </h1>

        {/* Supporting Text & Action Buttons Row */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-6 max-w-4xl">
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-md font-['Space_Grotesk'] leading-relaxed">
            We&apos;re assembling the operational crew behind IIIT Bhopal&apos;s sports, esports, events, media, and technology.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-amber-400 text-black font-extrabold text-xs uppercase tracking-widest hover:bg-amber-300 transition-all duration-300 font-mono shadow-lg shadow-amber-400/20 group"
            >
              <ClipboardList className="w-4 h-4" />
              <span>Apply for Sporlumina</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/team"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#0a0c10] border border-zinc-800 text-white font-extrabold text-xs uppercase tracking-widest hover:border-zinc-700 transition-colors duration-300 font-mono"
            >
              <Users className="w-4 h-4" />
              <span>Meet the Team</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Bottom Continuous Marquee Ticker Bar */}
      <div className="w-full border-t border-b border-zinc-900/80 bg-[#050608]/90 py-3.5 overflow-hidden z-20">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-xs font-mono tracking-[0.25em] text-zinc-400 uppercase">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-8">
              <span>{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
