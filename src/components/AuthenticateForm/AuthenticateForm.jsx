import React, { useEffect, useReducer, useRef, useState } from "react";
import useInput from "../../hooks/use-input";
import Input from "../UI/Input/Input";
import classes from "./AuthenticateForm.module.css";

const AuthenticateForm = (props) => {
  const email = useInput({
    validationFunction: (value) => value.includes("@"),
    defaultValue: "",
  });
  const password = useInput({
    validationFunction: (value) => value.trim().length >= 6,
    defaultValue: "",
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        email.isValid &&
          !email.hasError &&
          password.isValid &&
          !password.hasError
      );
    }, 300);

    return () => {
      clearTimeout(identifier);
    };
  }, [email, password]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      props.onSubmit({
        email: email.value,
        password: password.value,
      });
    } else if (!email.isValid) {
      email.onBlurHandler();
      emailInputRef.current.focus();
    } else {
      password.onBlurHandler();
      passwordInputRef.current.focus();
    }
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <Input
          inputConfig={{
            ref: emailInputRef,
            label: "Email",
            type: "email",
            id: "email",
            name: "email",
            placeholder: "example@gmail.com",
            inputHasError: email.hasError,
            value: email.value,
            onChange: email.onChangeHandler,
            onBlur: email.onBlurHandler,
          }}
        />
      </div>
      <div className={classes.control}>
        <Input
          inputConfig={{
            ref: passwordInputRef,
            label: "Password",
            type: "password",
            id: "password",
            name: "password",
            placeholder: "********",
            inputHasError: password.hasError,
            value: password.value,
            onChange: password.onChangeHandler,
            onBlur: password.onBlurHandler,
          }}
        />
      </div>
      <div className={classes.actions}>
        <button className={classes["login-button"]}>
          {props.isLoading ? "Loading..." : props.authMode}
        </button>
      </div>
    </form>
  );
};

export default AuthenticateForm;
