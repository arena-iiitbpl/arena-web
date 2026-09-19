export default function FeatureCard({ icon: Icon, title, description, badge }) {
  return (
    <div className="group relative bg-[#090b0f]/80 backdrop-blur-xl p-6 sm:p-7 rounded-2xl border border-zinc-800/80 hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-11 h-11 rounded-xl bg-black border border-zinc-800 flex items-center justify-center group-hover:border-amber-400 group-hover:bg-amber-400/10 transition-all">
            {Icon && <Icon className="w-5 h-5 text-zinc-300 group-hover:text-amber-400 group-hover:scale-110 transition-all" />}
          </div>

          {badge && (
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-zinc-950 text-zinc-400 border border-zinc-800 group-hover:text-amber-400 transition-colors">
              {badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 font-['Syne'] uppercase group-hover:text-amber-400 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-zinc-400 text-sm leading-relaxed font-['Space_Grotesk']">
          {description}
        </p>
      </div>

      {/* Bottom Accent Line */}
      <div className="mt-6 w-full h-[2px] bg-zinc-900 group-hover:bg-amber-400 transition-colors duration-300" />
    </div>
  );
}
