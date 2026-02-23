"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { base_Url } from "@/components/partials/Base_URL";

interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  medium_cover_image: string;
}

export default function UpcomingMovieGrid() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const res = await axios.get(
          `${base_Url}/list_movies.json?sort_by=date_added&order_by=desc&limit=6`, //desc le latest and new aauxa
        );
        const data: Movie[] = res?.data?.data?.movies ?? [];
        setMovies(data);
      } catch (e) {
        console.error("Failed to fetch upcoming movies:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcoming();
  }, []);

  return (
    <>
      <div className="flex items-center gap-2 text-white font-bold text-[18px] ml-24 mb-4">
        <span className="text-accent">★</span>
        Upcoming YTS Downloads
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-16">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {movies.map((movie) => (
              <div key={movie.id} className="w-full max-w-[240px]">
                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  year={movie.year}
                  rating={movie.rating}
                  medium_cover_image={movie.medium_cover_image}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
