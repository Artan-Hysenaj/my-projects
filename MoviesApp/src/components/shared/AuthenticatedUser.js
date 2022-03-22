import useAuthContext from "../../hooks/useAuthContext";
import { Alert } from "reactstrap";

const AuthenticatedUser = (props) => {
  const authContext = useAuthContext();
  if (!authContext.isAuthenticated) {
    return null;
  }

  const { user } = authContext;

  return (
    <Alert>
      <span className="m-lg-2">Email: {user.email} </span>
      <span> Role: {user.role}</span>
    </Alert>
  );
};

export default AuthenticatedUser;
