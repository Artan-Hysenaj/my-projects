import { useContext } from "react";
import MoviesContext from "../context/MoviesContext";

export default function useMoviesContext() {
  return useContext(MoviesContext);
}
