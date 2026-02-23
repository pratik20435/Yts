
"use client"
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IconSearch, IconLoader2, IconStarFilled } from "@tabler/icons-react";
import axios from "axios";
import { base_Url } from "@/components/partials/Base_URL";
import { AuthModal } from "@/components/common/AuthModal";

interface SearchMovie {
  id: number;
  title: string;
  year: number;
  rating: number;
  runtime: number;
  genres: string[];
  medium_cover_image: string;
  small_cover_image: string;
}

export function Header() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<SearchMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Auth Modal State
  const [authOpened, setAuthOpened] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  const openAuth = (mode: "login" | "register") => {
    setAuthMode(mode);
    setAuthOpened(true);
  };

  // Debounced search
  const doSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      setShowDropdown(false);
      setHasSearched(false);
      return;
    }
    setLoading(true);
    setShowDropdown(true);
    setHasSearched(false);
    try {
      const res = await axios.get(
        `${base_Url}/list_movies.json?query_term=${encodeURIComponent(query)}&limit=6`
      );
      const movies: SearchMovie[] = res?.data?.data?.movies ?? [];
      setResults(movies);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
      setHasSearched(true);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!search.trim()) {
      setResults([]);
      setShowDropdown(false);
      setHasSearched(false);
      return;
    }
    debounceRef.current = setTimeout(() => doSearch(search), 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search, doSearch]);

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowDropdown(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleResultClick = (id: number) => {
    setSearch("");
    setResults([]);
    setShowDropdown(false);
    setHasSearched(false);
    router.push(`/movies/${id}`);
  };

  const formatRuntime = (mins: number) => {
    if (!mins) return "";
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

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
        <div className="flex-1 max-w-[320px] mx-2 ml-70 hidden lg:block relative" ref={dropdownRef}>
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
              onFocus={() => {
                if (search.trim() && (results.length > 0 || hasSearched)) setShowDropdown(true);
              }}
            />
          </div>

          {/* Search Results Dropdown */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#1b1b1b] border border-[#2f2f2f] rounded-lg shadow-2xl overflow-hidden z-50 max-h-[420px] overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center gap-2 py-6 text-[#919191] text-sm">
                  <IconLoader2 size={18} className="animate-spin" />
                  Searching…
                </div>
              ) : results.length > 0 ? (
                <ul>
                  {results.map((m) => (
                    <li key={m.id}>
                      <button
                        onClick={() => handleResultClick(m.id)}
                        className="w-full flex items-start gap-3 px-3 py-2.5 hover:bg-[#2a2a2a] transition-colors text-left border-b border-[#2a2a2a] last:border-b-0"
                      >
                        {/* Poster */}
                        <img
                          src={m.small_cover_image || m.medium_cover_image}
                          alt={m.title}
                          className="w-10 h-[60px] object-cover rounded flex-shrink-0"
                        />
                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="text-white text-sm font-bold truncate">{m.title}</div>
                          <div className="flex items-center gap-2 mt-0.5 text-xs text-[#919191]">
                            <span>{m.year}</span>
                            {m.rating > 0 && (
                              <span className="flex items-center gap-0.5 text-yellow-400">
                                <IconStarFilled size={11} />
                                <span className="text-white font-semibold">{m.rating}</span>
                              </span>
                            )}
                            {m.runtime > 0 && (
                              <span>⏱ {formatRuntime(m.runtime)}</span>
                            )}
                          </div>
                          {m.genres && m.genres.length > 0 && (
                            <div className="text-[11px] text-[#6ab04c] mt-1 truncate">
                              {m.genres.join(", ")}
                            </div>
                          )}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : hasSearched ? (
                <div className="py-6 text-center text-[#919191] text-sm">
                  No movies found for &ldquo;{search}&rdquo;
                </div>
              ) : null}
            </div>
          )}
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
            <button
              onClick={() => openAuth("login")}
              className="text-white hover:text-[#919191] transition-colors cursor-pointer bg-transparent border-0 p-0 font-bold"
            >
              Login
            </button>
            <span className="text-[#2f2f2f]">|</span>
            <button
              onClick={() => openAuth("register")}
              className="text-white hover:text-[#919191] transition-colors cursor-pointer bg-transparent border-0 p-0 font-bold"
            >
              Register
            </button>
          </div>
        </nav>
      </div>

      <AuthModal
        opened={authOpened}
        onClose={() => setAuthOpened(false)}
        initialMode={authMode}
      />
    </header>
  );
}

export default Header;
