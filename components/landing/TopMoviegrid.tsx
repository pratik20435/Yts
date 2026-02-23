"use client";

import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { base_Url } from "../partials/Base_URL";

export default function InitialMovieGrid() {
  const [moviesList, setMoviesList] = useState<any[]>([]);
  console.log("@base url of top: ", base_Url);

  const APIGetMovies = async () => {
    try {
      const res: any = await axios.get(
        `${base_Url}/movie_suggestions.json?movie_id=10`,
      );
      console.log("@res for movie_suggestions: ", res);
      console.log("@res data for list movies: ", res?.data?.data?.movies);
      setMoviesList(res?.data?.data?.movies ?? []);
    } catch (e) {
      console.log("error fetching movies data");
    }
  };

  useEffect(() => {
    APIGetMovies();
  }, []);

  console.log("@moviesList: ", moviesList);

  return (
    <div className="mx-auto max-w-7xl px-6 pb-16">
      <div className="grid justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {moviesList.map((movie: any, index: number) => (
          <div key={movie.id ?? index} className="w-full max-w-[240px]">
            <MovieCard {...movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
