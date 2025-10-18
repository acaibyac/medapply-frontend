"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-bold text-[#005EB8]">
            MedApply
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-700">
            <Link href="#home" className="transition-colors hover:text-[#005EB8]">Home</Link>
            <Link href="#how" className="transition-colors hover:text-[#005EB8]">How it works</Link>
            <Link href="#start" className="px-3 py-2 border border-[#005EB8] rounded-lg transition-colors hover:bg-[#005EB8] hover:text-white">
              START Example Statement
            </Link>
            <Link href="/examples" className="px-3 py-2 bg-[#005EB8] text-white rounded-lg transition-colors hover:bg-[#004b92]">
              See Examples
            </Link>
          </div>

          {/* Mobile button */}
          <button
            type="button"
            className="md:hidden flex items-center text-[#005EB8] focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div id="mobile-menu" className="md:hidden mt-2 bg-white shadow rounded-lg p-4 space-y-2 text-gray-700">
            <Link href="#home" className="block transition-colors hover:text-[#005EB8]">Home</Link>
            <Link href="#how" className="block transition-colors hover:text-[#005EB8]">How it works</Link>
            <Link href="#start" className="block transition-colors hover:text-[#005EB8]">START Example Statement</Link>
            <Link href="/examples" className="block transition-colors hover:text-[#005EB8]">See Examples</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
