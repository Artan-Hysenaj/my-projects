import { useEffect } from "react";
import Api from "../api/api";
import { Alert, Row, Spinner } from "reactstrap";
import CostumCarousel from "../components/shared/CostumCarousel/CostumCarousel";
import useHttp from "../hooks/useHttp";
import Toaster from "../components/shared/Toaster";
const Home = (props) => {
  const {
    sendRequest,
    status,
    data: movies,
    error,
  } = useHttp(Api.movies.getMovies, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  let outlet = <CostumCarousel movies={movies}></CostumCarousel>;
  if (status === "pending") {
    outlet = <Spinner className="m-auto" />;
  }
  if (error) {
    outlet = <Toaster isOpen={true} icon="danger" title={error}></Toaster>;
  }
  if (status === "completed" && (!movies || movies.length === 0)) {
    outlet = <Alert>No Data</Alert>;
  }
  return (
    <div className="Home">
      <h1 className="d-flex justify-content-center mb-5">Home Page</h1>
      <div>
        <Row>{outlet}</Row>
      </div>
    </div>
  );
};

export default Home;
