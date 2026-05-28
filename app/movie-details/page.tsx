// const res: any = await axios.get(`${base_Url}/list_movies.json`);
"use client";
import axios from "axios";
import { base_Url } from "@/components/partials/Base_URL";
import { AuthModal } from "@/components/common/AuthModal";
import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function MovieCard() {
  const [moviesdetails, setmoviesdetails] = useState<any>(null);

  const fetch = async () => {
    const res: any = await axios.get(`${base_Url}/list_movies.json`);
    setmoviesdetails(res);
  };
  useEffect(() => {
    fetch();
  }, []);

  const movie: any[] = moviesdetails?.data?.data?.movies ?? [];
  console.log(movie);

  return (
    <div className="grid grid-cols-4 gap-x-14 gap-y-8 py-[12vh] px-[16vw]">
      {movie?.map((m: any) => (
        <div className="  flex flex-col gap-2 " key={m.id}>
          <div className=" relative aspect-9/16 max-h-[320px]">
            <Image
              src={m?.background_image}
              alt=""
              fill
              // height={700}
              // width={200}
              className="w-full h-full object-cover border-6 border-white"
            />
          </div>
          <h1>{m?.title}</h1>
          <h4>{m.rating}</h4>
        </div>
      ))}
    </div>
  );
}
