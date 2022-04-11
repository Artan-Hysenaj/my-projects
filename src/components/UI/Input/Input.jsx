import React from "react";
import classes from "./Input.module.css";
const Input = (props) => {
  const { inputConfig } = props;
  const { label, inputHasError, ...config } = inputConfig;
  return (
    <>
      <label className={classes.label} htmlFor={inputConfig.id}>
        {label}
        {inputHasError && <span className={classes.error}> is invalid</span>}
      </label>
      <input
        className={`${classes.input} ${
          inputHasError ? classes.inputError : null
        }`}
        {...config}
      />
    </>
  );
};

export default Input;
