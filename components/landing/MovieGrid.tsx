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
  {
    title: "The Last Voyage of the Demeter",
    year: 2023,
    rating: 6.4,
    image: "https://images.unsplash.com/photo-1584448141569-69f342da535c?q=80&w=1941&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "The Pale Blue Eye",
    year: 2022,
    rating: 7.0,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "The Menu",
    year: 2022,
    rating: 7.2,
    image: "https://images.unsplash.com/photo-1508161773455-3ada8ed2bbec?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title:"Exit Protocol",
    year: 2024,
    rating: 6.9,
    image: "https://images.unsplash.com/photo-1762356121454-877acbd554bb?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
 {
    title:"The Last of Us",
    year: 2023,
    rating: 8.5,
    image: "https://images.unsplash.com/photo-1761142681497-b2dc51f4e28c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title:"Because of Cupid",
    year: 2024,
    rating: 7.0,
    image: "https://images.unsplash.com/photo-1745389502067-e15b78eeaf05?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  }
  
];

export default function MovieGrid() {
  return (
   <div className="mx-auto max-w-7xl px-6 pb-12">
  <div className="grid justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
    {movies.map((movie, index) => (
      <div key={index} className="w-full max-w-[180px]">
        <MovieCard {...movie} />
      </div>
    ))}
  </div>
</div>


  );
}
