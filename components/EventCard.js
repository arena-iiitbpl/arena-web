import { Calendar, MapPin, ArrowUpRight } from "lucide-react";

export default function EventCard({ title, category, date, location, description, badge, gradientFrom = "from-red-600", gradientTo = "to-orange-600" }) {
  return (
    <div className="group glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 border border-zinc-800/80 hover:border-red-500/40 relative overflow-hidden">
      
      {/* Top Banner Accent */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradientFrom} ${gradientTo}`} />

      <div>
        {/* Category & Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            {category}
          </span>
          {badge && (
            <span className="text-[11px] font-semibold text-slate-400 bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800">
              {badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors font-['Outfit'] flex items-center justify-between">
          <span>{title}</span>
          <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-red-400" />
        </h3>

        {/* Info Pills */}
        <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-400 mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-red-400" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-orange-400" />
            <span>{location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-white transition-colors">
        <span>A.R.E.N.A Official</span>
        <span className="text-red-400 group-hover:underline">View Event Details &rarr;</span>
      </div>
    </div>
  );
}
