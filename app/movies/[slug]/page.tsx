"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { base_Url } from "@/components/partials/Base_URL";
import Navbar from "@/components/partials/Navbar";
import Footer from "@/components/partials/Footer";

interface Torrent {
  url: string;
  hash: string;
  quality: string;
  type: string;
  video_codec: string;
  seeds: number;
  peers: number;
  size: string;
  size_bytes: number;
  date_uploaded: string;
}

interface Cast {
  name: string;
  character_name: string;
  url_small_image: string;
  imdb_code: string;
}

interface Movie {
  id: number;
  url: string;
  imdb_code: string;
  title: string;
  title_english: string;
  title_long: string;
  slug: string;
  year: number;
  rating: number;
  runtime: number;
  genres: string[];
  like_count: number;
  description_intro: string;
  description_full: string;
  yt_trailer_code: string;
  language: string;
  mpa_rating: string;
  background_image: string;
  background_image_original: string;
  small_cover_image: string;
  medium_cover_image: string;
  large_cover_image: string;
  torrents: Torrent[];
  cast: Cast[];
}

export default function MovieDetails() {
  const params = useParams();
  const movieId = params?.slug as string;

  const [movie, setMovie] = useState<Movie | null>(null);
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "torrents">(
    "overview",
  );

  useEffect(() => {
    if (!movieId) return;
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${base_Url}/movie_details.json?movie_id=${movieId}&with_images=true&with_cast=true`,
        );
        const data: Movie = res?.data?.data?.movie;
        setMovie(data);

        const firstGenre: string = data?.genres?.[0] ?? "";
        if (firstGenre) {
          const sugRes = await axios.get(
            `${base_Url}/list_movies.json?genre=${encodeURIComponent(firstGenre)}&limit=8&sort_by=rating`, //rating ko aadhar ma priority sort
          );
          const allInGenre: Movie[] = sugRes?.data?.data?.movies ?? [];
          const filtered = allInGenre
            .filter((m) => m.id !== data?.id)
            .slice(0, 4);
          setSuggestions(filtered);
        }
      } catch {
        setError("Failed to load movie details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [movieId]);

  const formatRuntime = (mins: number) => {
    if (!mins) return "N/A";
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-14">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#6ab04c] border-t-transparent rounded-full animate-spin" />
            <p className="text-[#919191] text-sm">Loading movie details…</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-14 px-4">
          <div className="text-center">
            <div className="text-6xl mb-4">🎬</div>
            <h2 className="text-white text-2xl font-bold mb-2">
              Movie Not Found
            </h2>
            <p className="text-[#919191] mb-6">
              {error ?? "This movie could not be loaded."}
            </p>
            <Link
              href="/"
              className="bg-[#6ab04c] text-white px-6 py-2 rounded font-bold hover:opacity-90 transition-opacity"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // First torrent best quality
  const bestTorrent = movie.torrents?.[0];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      {/* ── Hero Section ── */}
      <div className="relative w-full pt-14" style={{ minHeight: 420 }}>
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${movie.background_image_original || movie.background_image})`,
          }}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row gap-8">
          {/* ── Poster + Download Button ── */}
          <div className="flex-shrink-0 flex flex-col items-center gap-3">
            <div
              className="rounded overflow-hidden shadow-2xl border border-white/10"
              style={{ width: 200 }}
            >
              <img
                src={movie.large_cover_image || movie.medium_cover_image}
                alt={movie.title}
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Green Download Button */}
            {bestTorrent && (
              <a
                href={bestTorrent.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: 200 }}
                className="block text-center bg-[#6ab04c] hover:bg-[#5a9a3c] text-white font-bold py-2.5 rounded transition-colors text-sm"
              >
                ⬇ Download
              </a>
            )}
          </div>

          {/* ── Movie Info (Center) ── */}
          <div className="flex-1 flex flex-col justify-start">
            {/* Breadcrumb */}
            <div className="text-xs text-[#919191] mb-2">
              <Link href="/" className="hover:text-[#6ab04c] transition-colors">
                Home
              </Link>
              <span className="mx-1">/</span>
              <span className="text-white">{movie.title}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              {movie.title}
            </h1>

            {/* Year · Genres */}
            <div className="mt-2 text-sm text-[#919191]">
              <span className="font-semibold text-white">{movie.year}</span>
            </div>
            <div className="text-sm text-[#ccc] mt-0.5">
              {movie.genres?.join(" / ")}
            </div>

            {/* Available in (quality pills) */}
            {movie.torrents && movie.torrents.length > 0 && (
              <div className="mt-4">
                <span className="text-xs text-[#919191] mr-2">
                  Available in:
                </span>
                {movie.torrents.map((t) => (
                  <a
                    key={`${t.quality}-${t.type}`}
                    href={t.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mr-2 mb-1 text-xs border border-[#6ab04c] text-[#6ab04c] px-2 py-0.5 rounded hover:bg-[#6ab04c] hover:text-white transition-colors font-semibold"
                  >
                    {t.quality}.{t.type.toUpperCase()}
                  </a>
                ))}
                {movie.torrents.some((t) =>
                  t.type.toLowerCase().includes("web"),
                ) && (
                  <div className="text-[11px] text-[#919191] mt-1">
                    WEB: same quality as BluRay
                  </div>
                )}
              </div>
            )}

            {/* Like count & IMDb */}
            <div className="flex items-center gap-6 mt-5">
              {/* Likes */}
              <div className="flex items-center gap-1.5">
                <span className="text-[#e74c3c] text-lg">♥</span>
                <span className="text-white font-bold text-base">
                  {movie.like_count ?? 0}
                </span>
              </div>

              {/* IMDb */}
              {movie.imdb_code && (
                <a
                  href={`https://www.imdb.com/title/${movie.imdb_code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <span className="bg-[#f5c518] text-black text-xs font-extrabold px-1.5 py-0.5 rounded">
                    IMDb
                  </span>
                  <span className="text-white font-bold">{movie.rating}</span>
                  <span className="text-[#919191] text-sm">/10</span>
                  <span className="text-yellow-400">★</span>
                </a>
              )}
            </div>

            {/* Runtime / Language */}
            <div className="flex flex-wrap gap-3 mt-4 text-sm text-[#919191]">
              {movie.runtime > 0 && (
                <span>⏱ {formatRuntime(movie.runtime)}</span>
              )}
              {movie.language && (
                <span className="uppercase">🌐 {movie.language}</span>
              )}
              {movie.mpa_rating && (
                <span className="border border-[#555] px-1.5 py-0.5 text-xs rounded text-[#ccc]">
                  {movie.mpa_rating}
                </span>
              )}
            </div>

            {/* Short description */}
            <p className="mt-4 text-[#c0c0c0] text-sm leading-relaxed max-w-xl line-clamp-3">
              {movie.description_intro || movie.description_full}
            </p>
          </div>

          {/* ── Similar Movies (Right sidebar in hero) ── */}
          {suggestions.length > 0 && (
            <div className="flex-shrink-0 w-full md:w-[200px]">
              <h3 className="text-white text-sm font-bold mb-3 border-b border-[#333] pb-1">
                Similar Movies
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {suggestions.slice(0, 4).map((m) => (
                  <Link
                    key={m.id}
                    href={`/movies/${m.id}`}
                    className="group block"
                  >
                    <div className="relative overflow-hidden rounded border border-white/10 group-hover:border-[#6ab04c] transition-colors">
                      <img
                        src={m.medium_cover_image}
                        alt={m.title}
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-1">
                        <span className="text-white text-[9px] font-bold leading-tight line-clamp-2">
                          {m.title}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Tags Row ── */}
        {movie.genres && movie.genres.length > 0 && (
          <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 pb-4 flex flex-wrap gap-2">
            {movie.genres.map((g) => (
              <span
                key={g}
                className="text-xs border border-[#444] text-[#ccc] px-3 py-1 rounded-sm hover:border-[#6ab04c] hover:text-[#6ab04c] transition-colors cursor-default"
              >
                {g.toLowerCase().replace(/ /g, "-")}
              </span>
            ))}
          </div>
        )}

        {/* ── VPN Banner ── */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 pb-6">
          <div className="bg-[#111] border border-[#333] rounded p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="text-white text-sm font-semibold">
                Please enable your VPN when downloading torrents
              </p>
              <p className="text-[#6ab04c] text-xs mt-0.5">
                If you torrent without a VPN, your ISP can see that you&apos;re
                torrenting and may throttle your connection and get fined by
                legal action!
              </p>
            </div>
            <a
              href="https://surfshark.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 bg-[#6ab04c] hover:bg-[#5a9a3c] text-white text-sm font-bold px-5 py-2 rounded transition-colors whitespace-nowrap"
            >
              Get Surf VPN
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Left: Tabs ── */}
        <div className="lg:col-span-2">
          {/* Tab bar */}
          <div className="flex border-b border-[#2f2f2f] mb-6">
            {(["overview", "torrents"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 text-sm font-bold capitalize transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-[#6ab04c] text-[#6ab04c]"
                    : "border-transparent text-[#919191] hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Overview tab */}
          {activeTab === "overview" && (
            <div>
              <h2 className="text-lg font-bold mb-3 text-white">Synopsis</h2>
              <p className="text-[#c0c0c0] leading-relaxed text-sm">
                {movie.description_full ||
                  movie.description_intro ||
                  "No description available."}
              </p>

              {/* Trailer */}
              {movie.yt_trailer_code && (
                <div className="mt-8">
                  <h2 className="text-lg font-bold mb-3 text-white">Trailer</h2>
                  <div
                    className="relative w-full rounded-lg overflow-hidden shadow-xl border border-[#2f2f2f]"
                    style={{ paddingBottom: "56.25%" }}
                  >
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${movie.yt_trailer_code}`}
                      title={`${movie.title} Trailer`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Torrents tab */}
          {activeTab === "torrents" && (
            <div className="overflow-x-auto">
              {movie.torrents?.length > 0 ? (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-[#919191] text-left border-b border-[#2f2f2f]">
                      <th className="pb-3 pr-6">Quality</th>
                      <th className="pb-3 pr-6">Type</th>
                      <th className="pb-3 pr-6">Size</th>
                      <th className="pb-3 pr-6">Seeds</th>
                      <th className="pb-3 pr-6">Peers</th>
                      <th className="pb-3">Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movie.torrents.map((t, i) => (
                      <tr
                        key={i}
                        className="border-b border-[#1f1f1f] hover:bg-white/5 transition-colors"
                      >
                        <td className="py-3 pr-6 font-bold text-[#6ab04c]">
                          {t.quality}
                        </td>
                        <td className="py-3 pr-6 text-[#919191] uppercase text-xs">
                          {t.type}
                        </td>
                        <td className="py-3 pr-6 text-[#c0c0c0]">{t.size}</td>
                        <td className="py-3 pr-6 text-green-400">{t.seeds}</td>
                        <td className="py-3 pr-6 text-red-400">{t.peers}</td>
                        <td className="py-3">
                          <a
                            href={t.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#6ab04c] text-white px-3 py-1 rounded text-xs font-bold hover:opacity-80 transition-opacity"
                          >
                            ↓ Torrent
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-[#919191] text-sm">
                  No torrent links available.
                </p>
              )}
            </div>
          )}
        </div>

        {/* ── Right: Movie Info Card ── */}
        <aside>
          <div className="bg-[#111] rounded-lg border border-[#2f2f2f] p-5">
            <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
              Movie Info
            </h3>
            <dl className="space-y-3 text-sm">
              {[
                { label: "Year", value: movie.year },
                { label: "Runtime", value: formatRuntime(movie.runtime) },
                { label: "Language", value: movie.language?.toUpperCase() },
                { label: "Rating", value: `${movie.rating} / 10` },
                { label: "MPA Rating", value: movie.mpa_rating || "N/A" },
                { label: "Genres", value: movie.genres?.join(", ") || "N/A" },
                {
                  label: "Likes",
                  value: movie.like_count?.toLocaleString() ?? "—",
                },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <dt className="text-[#919191]">{label}</dt>
                  <dd className="text-white font-medium text-right max-w-[60%]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}
