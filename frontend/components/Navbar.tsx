"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
      <div
        className={`
          glass rounded-full px-6 py-3 shadow-depth-xl
          transition-all duration-500 ease-out
          ${scrolled ? "scale-95 shadow-depth-xxl" : ""}
          hover:shadow-depth-xxl hover:border-white/20
          animate-border-glow
        `}
      >
        <div className="flex items-center justify-between gap-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 rounded-full border-2 border-white/80 flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:glow-white group-hover:scale-110">
              <div className="w-2.5 h-2.5 bg-white rounded-full transition-all duration-300 group-hover:scale-125 animate-glow-pulse" />
              <div className="absolute inset-0 rounded-full bg-white/10 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500" />
            </div>
            <span className="text-sm font-semibold tracking-wide transition-all duration-300 group-hover:text-glow">
              StudyAI
            </span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8 text-xs text-gray-400">
            {["Features", "How it Works", "Pricing", "About"].map((item, i) => (
              <Link
                key={item}
                href="#"
                className="relative py-1 transition-all duration-300 hover:text-white group"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-xs text-gray-300 hover:text-white transition-all duration-300 hidden sm:block"
            >
              Sign In
            </Link>
            <Link
              href="/study"
              className="btn-primary bg-white text-black text-xs font-semibold px-5 py-2 rounded-full glow-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
