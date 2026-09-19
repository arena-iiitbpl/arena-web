"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Trophy, Users, ClipboardList } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", icon: Trophy },
    { name: "Meet the Team", href: "/team", icon: Users },
    { name: "Apply for Sporlumina", href: "/apply", icon: ClipboardList },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050608]/80 backdrop-blur-xl border-b border-zinc-900 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3.5 group focus:outline-none"
          >
            <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-zinc-800 bg-black group-hover:border-amber-400 transition-colors">
              <Image
                src="/logo.jpg"
                alt="A.R.E.N.A Logo"
                fill
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-widest uppercase text-white font-['Syne'] group-hover:text-amber-400 transition-colors">
                A.R.E.N.A
              </span>
              <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase -mt-1">
                IIIT BHOPAL • ESPORTS & SPORTS
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#0a0c10] px-3 py-1.5 rounded-full border border-zinc-800/80">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? "bg-white text-black shadow-md shadow-white/10"
                      : link.href === "/apply"
                      ? "text-amber-400 hover:text-white hover:bg-amber-400/10"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-white hover:border-amber-400 transition-all"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#050608]/95 border-t border-b border-zinc-900 px-4 pt-4 pb-6 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-mono font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? "bg-white text-black shadow-lg"
                    : link.href === "/apply"
                    ? "text-amber-400 bg-amber-400/10"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
