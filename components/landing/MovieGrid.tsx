"use client";
import { title } from "process";
import MovieCard from "./MovieCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { base_Url } from "../partials/Base_URL";

export default function MovieGrid() {
  const [moviesList, setMoviesList] = useState();
  console.log("@base url: ", base_Url);
  const APIGetMovies = async () => {
    try {
      const res: any = await axios.get(`${base_Url}/list_movies.json`);
      console.log("@res for list movies: ", res);
      console.log("@res data for list movies: ", res?.data?.data?.movies);
      setMoviesList(res?.data?.data?.movies);
    } catch (e) {
      console.log("error fetching movies data");
    }
  };
  useEffect(() => {
    APIGetMovies();
  }, []);

  console.log("@moviesList: ", moviesList);

  return (
    <div className="mx-auto max-w-7xl px-6 pb-12">
      <div className="grid justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {moviesList?.map((movie: any, index: number) => (
          <div key={index} className="w-full max-w-[180px]">
            <MovieCard {...movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
