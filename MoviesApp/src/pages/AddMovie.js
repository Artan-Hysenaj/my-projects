import MovieForm from "../components/movies/MovieForm/MovieForm";
import useMoviesContext from "../hooks/useMoviesContext";

const AddMovie = (props) => {
  const { history } = props;
  const moviesContext = useMoviesContext();

  return (
    <div>
      {/* <h2>Add New Movie</h2> */}
      <MovieForm
        onSubmit={(movieData) => {
          moviesContext.handleAddMovie(movieData);
          history.push("/movies");
        }}
      />
    </div>
  );
};

export default AddMovie;
