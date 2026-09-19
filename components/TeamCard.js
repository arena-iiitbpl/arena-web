"use client";

import { useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";

export default function TeamCard({ name, imageSrc }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group relative bg-[#090b0f]/90 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 border border-zinc-800/80 hover:border-amber-400/60 hover:shadow-xl hover:shadow-amber-500/10 flex flex-col">
      
      {/* Image Container with 3:4 Aspect Ratio */}
      <div className="relative w-full aspect-[3/4] bg-zinc-950 overflow-hidden">
        {!imageError && imageSrc ? (
          <Image
            src={imageSrc}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            onError={() => setImageError(true)}
            priority={false}
          />
        ) : (
          /* Graceful Fallback if image fails */
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#07090d] text-zinc-500 p-4">
            <div className="w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <User className="w-8 h-8 text-amber-400" />
            </div>
            <span className="text-xs font-mono font-semibold text-zinc-400 text-center">A.R.E.N.A Member</span>
          </div>
        )}

        {/* Hover Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity pointer-events-none" />

        {/* Top Amber Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Name Container Below Image */}
      <div className="p-4 sm:p-5 text-center bg-[#07090d] border-t border-zinc-800/60 flex flex-col justify-center flex-grow">
        <h3 className="text-base sm:text-lg font-bold text-white font-['Syne'] tracking-wide group-hover:text-amber-400 transition-colors line-clamp-1">
          {name}
        </h3>
        <span className="text-[10px] font-mono font-bold text-amber-400/90 uppercase tracking-widest mt-0.5">
          A.R.E.N.A TEAM
        </span>
      </div>
    </div>
  );
}
