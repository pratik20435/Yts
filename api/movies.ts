// "use server";
// import { base_Url } from "@/components/partials/Base_URL";
// import axios from "axios";

import { DeleteRequest, GetRequest, PostRequest } from "@/components/plugins/http";

// export const APIGetMovies = async () => {
//   try {
//     const res: any = await axios.get(
//       `${base_Url}/movie_suggestions.json?movie_id=10`,
//     );
//     return res?.data?.data?.movies ?? [];
//   } catch (e) {
//     console.log("error fetching movies data");
//   }
// };

export const APIGetMovies = async () => {
  const res = await GetRequest("/movie_suggestions.json?movie_id=10");
//   const res2 = await DeleteRequest("/movie_suggestions.json?movie_id=10", id);
  console.log("@res for movie_suggestions: ", res);
  return res?.data?.movies;
};
