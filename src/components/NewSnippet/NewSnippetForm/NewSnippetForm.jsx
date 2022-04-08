import React from "react";
import useInput from "../../../hooks/use-input";
import { ADD } from "../../../store/snippets-store";
import { useStore } from "../../../store/store";
import classes from "./NewSnippetForm.module.css";

const isNotEmpty = (value) => value.trim() !== "";

const NewSnippetForm = (props) => {
  const [_, dispatch] = useStore({ shouldListen: true });

  const {
    value: nameInput,
    isValid: nameIsValid,
    hasError: nameHasError,
    onChangeHandler: nameChangeHandler,
    onBlurHandler: nameBlurHandler,
    reset: nameResetHandler,
  } = useInput({ validationFunction: isNotEmpty });
  const {
    value: languageInput,
    isValid: languageIsValid,
    hasError: languageHasError,
    onChangeHandler: languageChangeHandler,
    onBlurHandler: languageBlurHandler,
    reset: languageResetHandler,
  } = useInput({ validationFunction: isNotEmpty });
  const {
    value: descriptionInput,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    onChangeHandler: descriptionChangeHandler,
    onBlurHandler: descriptionBlurHandler,
    reset: descriptionResetHandler,
  } = useInput({ validationFunction: isNotEmpty });
  const {
    value: codeInput,
    isValid: codeIsValid,
    hasError: codeHasError,
    onChangeHandler: codeChangeHandler,
    onBlurHandler: codeBlurHandler,
    reset: codeResetHandler,
  } = useInput({ validationFunction: isNotEmpty });

  const resetForm = () => {
    nameResetHandler();
    languageResetHandler();
    descriptionResetHandler();
    codeResetHandler();
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const formIsValid =
      nameIsValid && descriptionIsValid && languageIsValid && codeIsValid;

    const formData = {
      name: nameInput,
      language: languageInput,
      description: descriptionInput,
      code: codeInput,
    };

    console.log(formIsValid);
    if (!formIsValid) return;
    dispatch(ADD, { snippet: formData });
    // resetForm();
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={nameInput}
          onChange={nameChangeHandler}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="language">Language</label>
        <select
          id="language"
          name="language"
          value={languageInput}
          onChange={languageChangeHandler}
          onBlur={languageBlurHandler}
        >
          <option value="">Choose a language</option>
          <option value="JavaScript">JavaScript</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
        </select>
      </div>
      <div className={classes.control}>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          rows="3"
          placeholder="ex. Logs to the console"
          value={descriptionInput}
          onChange={descriptionChangeHandler}
          onBlur={descriptionBlurHandler}
        ></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor="code">Code</label>
        <textarea
          name="code"
          id="code"
          rows="10"
          placeholder="ex. console.log('helloworld')"
          value={codeInput}
          onChange={codeChangeHandler}
          onBlur={codeBlurHandler}
        ></textarea>
      </div>
      <div className={classes.actions}>
        <button
          className={`${classes.clear} ${classes.button}`}
          type="reset"
          onClick={resetForm}
        >
          Clear
        </button>
        <div>
          <button className={`${classes.cancel} ${classes.button}`}>
            Cancel
          </button>
          <button
            className={`${classes.submit} ${classes.button}`}
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewSnippetForm;
