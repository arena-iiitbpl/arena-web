import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#040507] border-t border-zinc-900 pt-14 pb-10 px-4 sm:px-6 lg:px-8 text-zinc-400 relative z-10">
      <div className="max-w-7xl mx-auto">

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-400 gap-4">
          <p>© {new Date().getFullYear()} A.R.E.N.A – IIIT Bhopal. All rights reserved.By A.S.</p>
          <p className="text-zinc-400">Esports & Sports Club</p>
        </div>
      </div>
    </footer>
  );
}
