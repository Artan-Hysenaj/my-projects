import useAuthContext from "../../hooks/useAuthContext";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = (props) => {
  const authContext = useAuthContext();

  if (authContext.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return <Route {...props} />;
};

export default PublicRoute;
