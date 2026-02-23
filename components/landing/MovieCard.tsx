"use client";
import { IconStar } from "@tabler/icons-react";
import Link from "next/link";

interface MovieCardProps {
  id: number;
  title: string;
  year: number;
  rating: number;
  background_image?: string;
  medium_cover_image?: string;
  image?: string;
}

export default function MovieCard({
  id,
  title,
  year,
  rating,
  background_image,
  medium_cover_image,
  image,
}: MovieCardProps) {
  const poster = background_image || medium_cover_image || image || "";

  return (
    <Link href={`/movies/${id}`} className="group cursor-pointer block">
      <div className="relative aspect-[2/3] w-full border-4 border-white rounded-[2px] overflow-hidden transition-all duration-300 group-hover:border-accent">
        <img
          src={poster}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4">
          <IconStar
            size={48}
            className="text-accent mb-4"
            fill="currentColor"
          />
          <div className="text-2xl font-bold text-white mb-2">
            {rating} / 10
          </div>
          <div className="text-white text-sm font-semibold mb-6">{year}</div>
          <span className="bg-accent text-white px-6 py-2 rounded-sm font-bold hover:bg-white hover:text-accent transition-colors text-sm">
            View Details
          </span>
        </div>
      </div>

      <div className="mt-2">
        <div className="text-white font-bold truncate text-[14px] group-hover:text-[#919191] transition-colors">
          {title}
        </div>
        <div className="text-[#919191] text-[13px]">{year}</div>
      </div>
    </Link>
  );
}
