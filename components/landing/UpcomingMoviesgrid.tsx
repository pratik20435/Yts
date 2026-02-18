import { title } from "process";
import MovieCard from "./MovieCard";

const movies = [
  {
    title: "Joe's College Road Trip",
    year: 2024,
    rating: 7.2,
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1025&auto=format&fit=crop",
  },
  {
    title: "Kissing is the Easy Part",
    year: 2024,
    rating: 6.8,
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Love Me Love Me",
    year: 2023,
    rating: 8.1,
    image:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Is This Thing On?",
    year: 2024,
    rating: 7.5,
    image:
      "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "The Last Voyage of the Demeter",
    year: 2023,
    rating: 6.4,
    image:
      "https://images.unsplash.com/photo-1584448141569-69f342da535c?q=80&w=1941&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "The Pale Blue Eye",
    year: 2022,
    rating: 7.0,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function UpcomingMovieGrid() {
  return (
    <>
      <div className="flex items-center gap-2 text-white font-bold text-[18px] ml-8">
        <span className="text-accent">★</span>
        Upcoming YTS Downloads
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {movies.map((movie, index) => (
            <div key={index} className="w-full max-w-[240px]">
              <MovieCard {...movie} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
