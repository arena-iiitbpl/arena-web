export default function SectionHeading({ badge, title, subtitle, center = true }) {
  return (
    <div className={`mb-12 flex flex-col ${center ? "items-center text-center" : "items-start text-left"}`}>
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-xs font-bold uppercase tracking-widest text-red-400 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase font-['Outfit']">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-base sm:text-lg text-slate-400 font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}
