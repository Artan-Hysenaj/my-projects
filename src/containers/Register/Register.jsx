import React from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { LOGIN } from "../../store/auth-store";
import { useStore } from "../../store/store";
import { FIREBASE_REGISTER } from "../../helpers/helpers";
import Loading from "../../components/UI/Loading/Loading";
import AuthenticateForm from "../../components/AuthenticateForm/AuthenticateForm";
import classes from "./Register.module.css";
const Register = (props) => {
  const [_, dispatch] = useStore();
  const navigate = useNavigate();
  const { sendRequest: registerRequest, isLoading, error } = useHttp();
  const registerDataHandler = (authData) => {
    dispatch(LOGIN, { authData });
    if (error) return;
    navigate("/welcome");
  };
  const onSubmitHandler = (registerData) => {
    registerRequest(
      {
        url: FIREBASE_REGISTER,
        method: "POST",
        body: { ...registerData, returnSecureToken: true },
      },
      registerDataHandler
    );
  };
  if (error) console.log("register error: ", error);
  const loginInstead = (
    <p className={classes.changeAuth} onClick={props.toggleAuthMode}>
      Login with an existing account
    </p>
  );
  return (
    <div className={classes.register}>
      <h1>Create new account</h1>
      <AuthenticateForm
        onSubmit={onSubmitHandler}
        authMode="Sign Up"
        isLoading={isLoading}
      />
      {isLoading ? <Loading /> : loginInstead}
    </div>
  );
};

export default Register;
