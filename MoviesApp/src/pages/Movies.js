import { Route, Switch } from "react-router-dom";
import MovieList from "../components/movies/MovieList";
import AddMovie from "./AddMovie";
import EditMovie from "./EditMovie";
import AdminRoute from "../components/shared/AdminRoute";
import MoviesProvider from "../context/MoviesProvider";

const Movies = (props) => {
  return (
    <MoviesProvider>
      <div className="Movies">
        <Switch>
          <Route
            exact
            path="/movies"
            render={() => {
              return <MovieList />;
            }}
          />
          <AdminRoute path="/movies/new" component={AddMovie} />
          <AdminRoute path="/movies/edit/:id" component={EditMovie} />
        </Switch>
      </div>
    </MoviesProvider>
  );
};

export default Movies;
