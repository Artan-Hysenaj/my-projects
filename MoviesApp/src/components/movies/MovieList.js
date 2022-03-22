import { Alert, Row, Spinner } from "reactstrap";
import useMoviesContext from "../../hooks/useMoviesContext";
import Movie from "./Movie/Movie";

const MovieList = (props) => {
  const { loading, movies } = useMoviesContext();
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <Row>
          {!movies || movies.length === 0 ? (
            <Alert>No data!</Alert>
          ) : (
            movies.map((movie) => <Movie key={movie._id} movie={movie} />)
          )}
        </Row>
      )}
    </div>
  );
};

export default MovieList;
