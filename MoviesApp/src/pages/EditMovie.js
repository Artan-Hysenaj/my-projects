import MovieForm from "../components/movies/MovieForm/MovieForm";
import useMoviesContext from "../hooks/useMoviesContext";

const EditMovie = (props) => {
  const { history } = props;
  const movieId = props.match.params.id;

  const movieContext = useMoviesContext();

  const movieData = movieContext.getMovieById(movieId);

  if (!movieData) {
    return null;
  }

  return (
    <div>
      <MovieForm
        initalData={movieData}
        onSubmit={(movieData) => {
          movieContext.handleEditMovie(movieData);
          history.push("/movies");
        }}
      />
    </div>
  );
};

export default EditMovie;
