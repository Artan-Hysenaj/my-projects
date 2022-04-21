import React from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { LOGIN } from "../../store/auth-store";
import { useStore } from "../../store/store";
import { FIREBASE_LOGIN } from "../../helpers/helpers";
import Loading from "../../components/UI/Loading/Loading";
import AuthenticateForm from "../../components/AuthenticateForm/AuthenticateForm";
import classes from "./Login.module.css";
const Login = (props) => {
  const [_, dispatch] = useStore({ shouldListen: false });
  const navigate = useNavigate();
  const { sendRequest: loginRequest, isLoading, error } = useHttp();
  const loginDataHandler = (authData) => {
    dispatch(LOGIN, { authData });
    if (error && !isLoading) return;
    navigate("/");
  };
  const onSubmitHandler = (loginData) => {
    loginRequest(
      {
        url: FIREBASE_LOGIN,
        method: "POST",
        body: { ...loginData, returnSecureToken: true },
      },
      loginDataHandler
    );
  };
  if (error) console.log("register error: ", error);
  const registerInstead = (
    <p className={classes.changeAuth} onClick={props.toggleAuthMode}>
      Register instead
    </p>
  );
  return (
    <div className={classes.login}>
      <h1>Log In</h1>
      <AuthenticateForm
        onSubmit={onSubmitHandler}
        authMode="Log In"
        isLoading={isLoading}
      />
      {isLoading ? <Loading /> : registerInstead}
    </div>
  );
};

export default Login;
