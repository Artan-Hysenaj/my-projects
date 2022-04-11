import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import useInput from "../../../hooks/use-input";
import { useStore } from "../../../store/store";
import { FIREBASE } from "../../../util/utilities";
import Loading from "../../UI/Loading/Loading";
import Modal from "../../UI/Modal/Modal";
import classes from "./NewSnippetForm.module.css";

const isNotEmpty = (value) => value.trim() !== "";

const NewSnippetForm = (props) => {
  const [{ userId, token }] = useStore();
  const { snippet } = props;
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { sendRequest: editSnippetById, isLoading, error } = useHttp();
  const nameRef = useRef();

  const {
    value: nameInput,
    isValid: nameIsValid,
    hasError: nameHasError,
    onChangeHandler: nameChangeHandler,
    onBlurHandler: nameBlurHandler,
    reset: nameResetHandler,
  } = useInput({
    validationFunction: isNotEmpty,
    defaultValue: snippet?.name ? snippet.name : "",
  });
  const {
    value: languageInput,
    isValid: languageIsValid,
    hasError: languageHasError,
    onChangeHandler: languageChangeHandler,
    onBlurHandler: languageBlurHandler,
    reset: languageResetHandler,
  } = useInput({
    validationFunction: isNotEmpty,
    defaultValue: snippet?.language ? snippet.language : "",
  });
  const {
    value: descriptionInput,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    onChangeHandler: descriptionChangeHandler,
    onBlurHandler: descriptionBlurHandler,
    reset: descriptionResetHandler,
  } = useInput({
    validationFunction: isNotEmpty,
    defaultValue: snippet?.description ? snippet.description : "",
  });
  const {
    value: codeInput,
    isValid: codeIsValid,
    hasError: codeHasError,
    onChangeHandler: codeChangeHandler,
    onBlurHandler: codeBlurHandler,
    reset: codeResetHandler,
  } = useInput({
    validationFunction: isNotEmpty,
    defaultValue: snippet?.code ? snippet.code : "",
  });

  const resetForm = () => {
    nameResetHandler();
    languageResetHandler();
    descriptionResetHandler();
    codeResetHandler();
  };

  const formIsValid =
    nameIsValid && languageIsValid && descriptionIsValid && codeIsValid;

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const formData = {
      name: nameInput,
      language: languageInput,
      description: descriptionInput,
      code: codeInput,
    };

    if (!formIsValid) return;
    if (snippet) {
      editSnippetById({
        url: FIREBASE + `snippets/${userId}/${snippet.id}.json`,
        method: "PUT",
        body: formData,
      });
    } else {
      props.onCreateNewSnippet(formData);
    }

    if (!props.error) {
      resetForm();
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  };

  return (
    <>
      {showModal && (
        <Modal
          title="Are you sure?"
          actionsConfig={{ title: "Continue" }}
          onClose={() => setShowModal(false)}
          onConfirm={() => {
            resetForm();
            navigate("/");
          }}
        >
          <p>If you continue, all your data on this form will be lost.</p>
        </Modal>
      )}
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">
            Name
            {nameHasError && (
              <span className={classes.error}> should not be empty</span>
            )}
          </label>
          <input
            ref={nameRef}
            type="text"
            name="name"
            id="name"
            placeholder="ex. Console Log"
            value={nameInput}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="language">
            Language
            {languageHasError && (
              <span className={classes.error}> should not be empty</span>
            )}
          </label>
          <select
            id="language"
            name="language"
            value={languageInput}
            onChange={languageChangeHandler}
            onBlur={languageBlurHandler}
          >
            <option value="">Choose a language</option>
            <option value="ReactJS">ReactJS</option>
            <option value="JavaScript">JavaScript</option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="description">
            Description
            {descriptionHasError && (
              <span className={classes.error}> should not be empty</span>
            )}
          </label>
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
          <label htmlFor="code">
            Code
            {codeHasError && (
              <span className={classes.error}> should not be empty</span>
            )}
          </label>
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
        {props.isLoading ? (
          <Loading />
        ) : (
          <div className={classes.actions}>
            <button
              type="button"
              className={`${classes.clear} ${classes.button}`}
              onClick={resetForm}
            >
              Clear
            </button>
            <div>
              <button
                type="button"
                className={`${classes.cancel} ${classes.button}`}
                onClick={() => setShowModal(true)}
              >
                Cancel
              </button>
              <button
                className={`${formIsValid ? "" : classes.disabled} ${
                  classes.submit
                } ${classes.button} `}
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default NewSnippetForm;
