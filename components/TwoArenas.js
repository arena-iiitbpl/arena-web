export default function TwoArenas() {
  return (
    <section id="arenas" className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-zinc-900 bg-transparent scroll-mt-10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-zinc-900 gap-6">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-[0.25em] block mb-3">
            DUAL ECOSYSTEM
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase font-['Syne'] tracking-tight leading-none">
            TWO ARENAS. <br />
            ONE STANDARD.
          </h2>
        </div>

        <p className="text-zinc-400 text-sm sm:text-base max-w-md font-['Space_Grotesk'] leading-relaxed">
          Physical sport and competitive esports belong on equal ground. We build the systems, stories, schedules, and teams that let both thrive.
        </p>
      </div>

      {/* Dual Arena Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        
        {/* ================= CARD 01: SPORT (ON FIELD) ================= */}
        <div className="group relative bg-[#090b0f]/80 backdrop-blur-xl border border-zinc-800/90 hover:border-amber-500/50 rounded-3xl p-6 sm:p-10 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 min-h-[500px]">
          
          {/* Subtle Ambient Radial Glow on Hover */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all duration-500 pointer-events-none" />
          <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

          {/* Corner Crosshair Accents */}
          <div className="absolute top-4 left-4 text-zinc-700 font-mono text-[10px]">+</div>
          <div className="absolute top-4 right-4 text-zinc-700 font-mono text-[10px]">+</div>
          <div className="absolute bottom-4 left-4 text-zinc-700 font-mono text-[10px]">+</div>
          <div className="absolute bottom-4 right-4 text-zinc-700 font-mono text-[10px]">+</div>

          {/* Top Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 z-10">
            <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
              01 // FIELD ATHLETICS
            </span>
            
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-mono font-bold text-amber-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>MOTION TRACKED • LIVE</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-950/80 border border-zinc-800 text-[10px] font-mono text-zinc-400">
              <span>PACE</span>
              <span className="font-bold text-white">08.42 m/s</span>
            </div>
          </div>

          {/* Center Graphic Showcase: Neon Amber Sprinter HUD */}
          <div className="my-8 relative flex flex-col items-center justify-center h-56 z-10">
            
            {/* Vector Sprinter SVG */}
            <div className="relative w-52 h-52 flex items-center justify-center">
              {/* Outer HUD Orbit Ring */}
              <div className="absolute inset-0 rounded-full border border-amber-500/20 group-hover:border-amber-500/40 group-hover:scale-105 transition-all duration-500 pointer-events-none border-dashed" />
              <div className="absolute inset-4 rounded-full border border-amber-500/10 pointer-events-none" />

              <svg viewBox="0 0 200 160" className="w-44 h-44 text-amber-400 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_25px_rgba(245,158,11,0.7)]">
                {/* Sprinter Head */}
                <circle cx="125" cy="30" r="14" fill="currentColor" />
                
                {/* Body Torso */}
                <line x1="125" y1="44" x2="85" y2="85" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                
                {/* Arms */}
                <line x1="110" y1="55" x2="60" y2="70" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                <line x1="110" y1="55" x2="155" y2="50" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                
                {/* Legs */}
                <line x1="85" y1="85" x2="40" y2="125" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
                <line x1="85" y1="85" x2="140" y2="105" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
                <line x1="140" y1="105" x2="165" y2="140" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />

                {/* Speed Lines */}
                <path d="M 10 140 Q 100 110 190 140" stroke="rgba(245,158,11,0.3)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
              </svg>
            </div>

            {/* Bottom HUD Bar */}
            <div className="mt-2 w-48 h-1 bg-zinc-900 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 w-3/4 group-hover:w-full transition-all duration-700" />
            </div>
          </div>

          {/* Bottom Card Content */}
          <div className="z-10 pt-4 border-t border-zinc-900">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
                ON FIELD
              </span>
              <span className="text-[10px] font-mono text-zinc-400">PHYSICAL ARENA</span>
            </div>
            
            <h3 className="text-4xl sm:text-5xl font-black text-white font-['Syne'] uppercase tracking-tight mb-2 group-hover:text-amber-400 transition-colors">
              SPORT
            </h3>
            
            <p className="text-zinc-400 text-sm font-['Space_Grotesk'] leading-relaxed">
              Leagues, trials, practice, wellbeing, and the pulse of live competition.
            </p>
          </div>

        </div>

        {/* ================= CARD 02: ESPORT (ON SERVER) ================= */}
        <div className="group relative bg-[#090b0f]/80 backdrop-blur-xl border border-zinc-800/90 hover:border-cyan-500/50 rounded-3xl p-6 sm:p-10 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 min-h-[500px]">
          
          {/* Subtle Ambient Radial Glow on Hover */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-500 pointer-events-none" />
          <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

          {/* Corner Crosshair Accents */}
          <div className="absolute top-4 left-4 text-zinc-700 font-mono text-[10px]">+</div>
          <div className="absolute top-4 right-4 text-zinc-700 font-mono text-[10px]">+</div>
          <div className="absolute bottom-4 left-4 text-zinc-700 font-mono text-[10px]">+</div>
          <div className="absolute bottom-4 right-4 text-zinc-700 font-mono text-[10px]">+</div>

          {/* Top Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 z-10">
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
              02 // DIGITAL SERVER
            </span>
            
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono font-bold text-cyan-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>SYSTEM READY • 24 MS</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-950/80 border border-zinc-800 text-[10px] font-mono text-zinc-400">
              <span>STATUS</span>
              <span className="font-bold text-cyan-400">ONLINE</span>
            </div>
          </div>

          {/* Center Graphic Showcase: Neon Cyan Controller HUD */}
          <div className="my-8 relative flex flex-col items-center justify-center h-56 z-10">
            
            {/* Vector Gamepad SVG */}
            <div className="relative w-52 h-52 flex items-center justify-center">
              {/* Outer Wireframe Target Square */}
              <div className="absolute inset-2 border border-cyan-500/20 group-hover:border-cyan-500/40 group-hover:rotate-45 transition-all duration-700 pointer-events-none" />

              <svg viewBox="0 0 200 160" className="w-44 h-44 text-cyan-400 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_25px_rgba(6,182,212,0.7)]">
                {/* Controller Outer Shell */}
                <path 
                  d="M 50 40 C 70 35, 130 35, 150 40 C 180 50, 185 100, 160 120 C 145 130, 130 100, 115 90 C 105 85, 95 85, 85 90 C 70 100, 55 130, 40 120 C 15 100, 20 50, 50 40 Z" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="5" 
                  strokeLinejoin="round" 
                />
                
                {/* D-Pad */}
                <path d="M 60 65 L 75 65 M 67.5 57.5 L 67.5 72.5" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                
                {/* Action Buttons */}
                <circle cx="135" cy="60" r="4.5" fill="currentColor" />
                <circle cx="147" cy="70" r="4.5" fill="currentColor" />
                <circle cx="123" cy="70" r="4.5" fill="currentColor" />
                <circle cx="135" cy="80" r="4.5" fill="currentColor" />
              </svg>
            </div>

            {/* Bottom HUD Bar */}
            <div className="mt-2 w-48 h-1 bg-zinc-900 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400 w-3/4 group-hover:w-full transition-all duration-700" />
            </div>
          </div>

          {/* Bottom Card Content */}
          <div className="z-10 pt-4 border-t border-zinc-900">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                ON SERVER
              </span>
              <span className="text-[10px] font-mono text-zinc-400">DIGITAL ARENA</span>
            </div>
            
            <h3 className="text-4xl sm:text-5xl font-black text-white font-['Syne'] uppercase tracking-tight mb-2 group-hover:text-cyan-400 transition-colors">
              ESPORT
            </h3>
            
            <p className="text-zinc-400 text-sm font-['Space_Grotesk'] leading-relaxed">
              Standing teams, structured practice, tournaments, and broadcast-ready play.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}
