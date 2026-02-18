import { title } from "process";
import MovieCard from "./MovieCard";


const movies = [
  {
    title: "Joe's College Road Trip",
    year: 2024,
    rating: 7.2,
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1025&auto=format&fit=crop",
  },
  {
    title: "Kissing is the Easy Part",
    year: 2024,
    rating: 6.8,
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Love Me Love Me",
    year: 2023,
    rating: 8.1,
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Is This Thing On?",
    year: 2024,
    rating: 7.5,
    image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1000&auto=format&fit=crop",
  },
  
];

export default function InitialMovieGrid() {
  return (
   <div className="mx-auto max-w-7xl px-6 pb-16">
  <div className="grid justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
    {movies.map((movie, index) => (
      <div key={index} className="w-full max-w-[240px]">
        <MovieCard {...movie} />
      </div>
    ))}
  </div>
</div>



  );
}
