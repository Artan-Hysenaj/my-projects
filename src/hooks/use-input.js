import { useEffect, useReducer, useState } from "react";

const inputStateReducer = (state, action) => {
  switch (action.type) {
    case "INPUT":
      return { value: action.value, isTouched: true };
    case "BLUR":
      return {
        isTouched: true,
        value: state.value,
      };
    case "RESET":
      return {
        value: "",
        isTouched: false,
      };

    case "SET_DEFAULT_VALUE":
      return {
        value: action.value,
        isTouched: false,
      };
    default:
      return {
        value: "",
        isTouched: false,
      };
  }
};
const useInput = (options) => {
  const { validationFunction, defaultValue } = options;
  const [inputState, dispatch] = useReducer(inputStateReducer, {
    value: "",
    isTouched: false,
  });

  useEffect(() => {
    if (defaultValue?.trim() !== "" && defaultValue?.trim().length !== 0) {
      dispatch({ type: "SET_DEFAULT_VALUE", value: defaultValue });
    }
  }, [defaultValue]);

  const valueIsValid = validationFunction(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const onChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const onBlurHandler = () => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };
  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    onChangeHandler,
    onBlurHandler,
    reset,
  };
};
export default useInput;
