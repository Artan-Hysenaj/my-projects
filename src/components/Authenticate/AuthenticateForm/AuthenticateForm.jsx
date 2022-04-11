import React, { useEffect, useReducer, useRef, useState } from "react";
import Input from "../../UI/Input/Input";
import classes from "./AuthenticateForm.module.css";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isTouched: true,
      isValid: action.val.includes("@"),
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isTouched: true,
      isValid: state.value.includes("@"),
    };
  }
  return { value: "", isValid: false, isTouched: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.trim().length >= 6,
      isTouched: true,
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.trim().length >= 6,
      isTouched: true,
    };
  }
  return { value: "", isTouched: true, isValid: false };
};

const AuthenticateForm = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isTouched: false,
    isValid: false,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isTouched: false,
    isValid: false,
  });
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const { isValid: emailIsValid, isTouched: emailIsTouched } = emailState;
  const { isValid: passwordIsValid, isTouched: passwordIsTouched } =
    passwordState;
  const emailHasErrors = !emailIsValid && emailIsTouched;
  const passwordHasErrors = !passwordIsValid && passwordIsTouched;
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(!emailHasErrors && !passwordHasErrors);
    }, 300);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      props.onSubmit({
        email: emailState.value,
        password: passwordState.value,
      });
    } else if (!emailIsValid) {
      dispatchEmail({ type: "INPUT_BLUR" });
      emailInputRef.current.focus();
    } else {
      dispatchPassword({ type: "INPUT_BLUR" });
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
            inputHasError: emailHasErrors,
            value: emailState.value,
            onChange: emailChangeHandler,
            onBlur: validateEmailHandler,
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
            inputHasError: passwordHasErrors,
            value: passwordState.value,
            onChange: passwordChangeHandler,
            onBlur: validatePasswordHandler,
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
