import { PostRequest } from "../plugins/http";
import { API_END_POINTS } from "./endPoints";

export const APIAuthenticateGoogleSignin = (body: any) => {
  return PostRequest(API_END_POINTS.MOVIES.TOPMOVIE, body);
};
