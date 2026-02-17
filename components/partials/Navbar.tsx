"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconSearch } from "@tabler/icons-react";

export function Header() {
  const [search, setSearch] = useState("");

  return (
    <header className="fixed top-0 w-full z-40 bg-[rgba(29,29,29,0.95)] border-b border-border-custom h-14 flex items-center shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo and tagline */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-[28px] font-bold tracking-tighter text-white flex items-center">
              <Image src="https://yts.bz/assets/images/website/logo-YTS-lt.svg" alt="Logo" width={120} height={40} className="ml-16 mt-2 " />
            </div>
          </Link>
          <span className="hidden md:block text-[14px] text-[#919191] font-bold mt-1 uppercase tracking-wider">
            HD movies at the smallest file size.
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-[320px] mx-2 ml-70 hidden lg:block ">
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[#919191] group-focus-within:text-accent">
              <IconSearch size={16} stroke={3} />
            </div>
            <input
              type="text"
              placeholder="Quick search"
              className="w-full bg-[#1b1b1b] border border-[#2f2f2f] rounded-full py-1.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-accent transition-colors placeholder:text-[#919191]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6 mr-24">
          <div className="hidden md:flex items-center gap-6 font-bold text-[13px] text-[#919191]">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link
              href="/4k"
              className="text-accent hover:text-white transition-colors"
            >
              4K
            </Link>
            <Link
              href="/trending"
              className="hover:text-white transition-colors"
            >
              Trending
            </Link>
            <Link
              href="/browse-movies"
              className="hover:text-white transition-colors"
            >
              Browse Movies
            </Link>
          </div>
          <div className="flex items-center gap-3 font-bold text-[13px]">
            <Link
              href="/login"
              className="text-white hover:text-[#919191] transition-colors"
            >
              Login
            </Link>
            <span className="text-[#2f2f2f]">|</span>
            <Link
              href="/register"
              className="text-white hover:text-[#919191] transition-colors"
            >
              Register
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
