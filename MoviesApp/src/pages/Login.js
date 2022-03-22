import LoginForm from "../components/user/LoginForm";
import useAuthContext from "../hooks/useAuthContext";

const Login = (props) => {
  const authContext = useAuthContext();

  return (
    <LoginForm
      onSubmit={(token) => {
        authContext.setLoggedInUser(token);
        props.history.push("/");
      }}
    />
  );
};

export default Login;
