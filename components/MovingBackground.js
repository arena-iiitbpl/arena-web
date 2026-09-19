export default function MovingBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Moving Amber Glow Orb */}
      <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] animate-blob-amber" />
      
      {/* Moving Cyan Glow Orb */}
      <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] animate-blob-cyan" />

      {/* Center Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-tech-grid opacity-40" />
    </div>
  );
}
