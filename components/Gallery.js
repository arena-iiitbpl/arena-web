import { Trophy, Gamepad2, Flame, Award, Users, Star } from "lucide-react";

export default function Gallery() {
  const items = [
    {
      id: 1,
      title: "Inter-College Turf Cup Finals",
      subtitle: "Physical Sports • IIIT Bhopal Ground",
      span: "col-span-1 sm:col-span-2 md:col-span-2 row-span-2",
      icon: Trophy,
      bgColor: "from-red-950/80 via-zinc-900 to-black",
      badge: "Championship",
    },
    {
      id: 2,
      title: "LAN Valorant Showdown",
      subtitle: "Esports • High Octane Arena",
      span: "col-span-1 md:col-span-1 row-span-1",
      icon: Gamepad2,
      bgColor: "from-orange-950/80 via-zinc-900 to-black",
      badge: "LAN Event",
    },
    {
      id: 3,
      title: "Night Cricket Carnival",
      subtitle: "Floodlight Athletics",
      span: "col-span-1 md:col-span-1 row-span-1",
      icon: Flame,
      bgColor: "from-red-900/60 via-zinc-900 to-black",
      badge: "Night Event",
    },
    {
      id: 4,
      title: "Futsal Blitz Tournament",
      subtitle: "Intra-IIIT League",
      span: "col-span-1 md:col-span-1 row-span-1",
      icon: Award,
      bgColor: "from-amber-950/80 via-zinc-900 to-black",
      badge: "League",
    },
    {
      id: 5,
      title: "Community Recreation & Chess Meet",
      subtitle: "Mind Sports & Board Games",
      span: "col-span-1 sm:col-span-2 md:col-span-2 row-span-1",
      icon: Users,
      bgColor: "from-rose-950/70 via-zinc-900 to-black",
      badge: "Recreation",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[220px]">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className={`group relative glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-end overflow-hidden transition-all duration-500 hover:scale-[1.02] border border-zinc-800/80 hover:border-red-500/50 ${item.span}`}
          >
            {/* Background Graphic Pattern */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.bgColor} opacity-90 group-hover:opacity-100 transition-opacity`} />
            <div className="absolute inset-0 bg-cyber-grid opacity-30 group-hover:opacity-50 transition-opacity" />

            {/* Glowing Accent Orb */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/20 rounded-full blur-3xl group-hover:bg-red-500/35 transition-all duration-500 pointer-events-none" />

            {/* Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-zinc-950/80 text-red-400 border border-red-500/30">
                <Star className="w-3 h-3 text-red-400" />
                {item.badge}
              </span>
            </div>

            {/* Center Graphic Icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 group-hover:opacity-20 group-hover:scale-125 transition-all duration-500 pointer-events-none">
              <Icon className="w-32 h-32 text-red-400" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center mb-3 group-hover:bg-red-500 group-hover:text-white transition-all">
                <Icon className="w-5 h-5 text-red-400 group-hover:text-white transition-colors" />
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] uppercase tracking-tight group-hover:text-red-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-slate-300 mt-1">
                {item.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
