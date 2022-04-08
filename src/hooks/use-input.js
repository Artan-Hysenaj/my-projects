import { useReducer } from "react";
const initialState = {
  value: "",
  isTouched: false,
};
const inputStateReducer = (state, action) => {
  switch (action.type) {
    case "INPUT":
      return { value: action.value, isTouched: state.isTouched };
    case "BLUR":
      return {
        isTouched: true,
        value: state.value,
      };
    case "RESET":
      return {
        isTouched: false,
        value: "",
      };
    default:
      return initialState;
  }
};
const useInput = (options) => {
  const { validationFunction } = options;
  const [inputState, dispatch] = useReducer(inputStateReducer, initialState);

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
