import React, { useEffect, useState } from "react";
import Api from "../api/api";
import Toaster from "../components/shared/Toaster";
import MoviesContext from "./MoviesContext";
const MoviesProvider = (props) => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    Api.movies
      .getMovies()
      .then((response) => {
        setMovies(response);
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleFeatured = (movieId) => {
    const movie = getMovieById(movieId);
    Api.movies
      .updateMovie({ ...movie, featured: !movie.featured })
      .then((response) =>
        setMovies(
          movies.map((movie) =>
            movie._id === movieId ? response.data.film : movie
          )
        )
      );
  };

  const handleDelete = (movieId) => {
    Api.movies
      .deleteMovie(movieId)
      .then(() => {
        setMovies(movies.filter((movie) => movie._id !== movieId));
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleAddMovie = (movie) => {
    Api.movies.addMovie(movie).then((response) => {
      setMovies((prevState) => [...prevState, response.data.film]);
    });
  };

  const handleEditMovie = (movie) => {
    Api.movies.updateMovie(movie).then((response) => {
      const updatedMovie = response.data.film;
      setMovies(
        movies.map((currentMovie) => {
          if (currentMovie._id === updatedMovie._id) {
            return updatedMovie;
          }
          return currentMovie;
        })
      );
    });
  };

  const getMovieById = (movieId) => {
    return movies.find((currentMovie) => currentMovie._id === movieId);
  };
  let outlet;
  if (error) outlet = <Toaster isOpen icon="danger" title={error} />;
  const moviesContext = {
    movies,
    loading,
    error,
    handleClearError: () => setError(null),
    handleFeatured,
    handleDelete,
    handleAddMovie,
    handleEditMovie,
    getMovieById,
  };

  return (
    <MoviesContext.Provider value={moviesContext}>
      {outlet}
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesProvider;
