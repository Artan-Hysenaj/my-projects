import { Star } from "react-feather";
import useMoviesContext from "../../../hooks/useMoviesContext";

const Featured = (props) => {
  const { isFeatured, movieId } = props;
  const moviesContext = useMoviesContext();

  const handleClick = () => {
    moviesContext.handleFeatured(movieId);
  };

  return (
    <div className="text-center mb-2 mt-2">
      <span role="button" onClick={handleClick}>
        <Star
          fill={isFeatured ? "green" : "white"}
          stroke={isFeatured ? "green" : "black"}
        />
      </span>
    </div>
  );
};

export default Featured;
