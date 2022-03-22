import useAuthContext from "../../hooks/useAuthContext";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = (props) => {
  const authContext = useAuthContext();

  if (!authContext.isAuthenticated) {
    return <Redirect to="/login" />;
  }

  if (!authContext.isAdmin) {
    return <Redirect to="/" />;
  }

  return <Route {...props} />;
};

export default AdminRoute;
