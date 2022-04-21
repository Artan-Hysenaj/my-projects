import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/use-input";
import Input from "../UI/Input/Input";
import Loading from "../UI/Loading/Loading";
import Modal from "../UI/Modal/Modal";
import classes from "./NewSnippetForm.module.css";

const isNotEmpty = (value) => value.trim() !== "";

const NewSnippetForm = (props) => {
  const { snippet } = props;
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const name = useInput({
    validationFunction: isNotEmpty,
    defaultValue: snippet?.name ? snippet.name : "",
  });

  const language = useInput({
    validationFunction: isNotEmpty,
    defaultValue: snippet?.language ? snippet.language : "",
  });

  const description = useInput({
    validationFunction: isNotEmpty,
    defaultValue: snippet?.description ? snippet.description : "",
  });

  const code = useInput({
    validationFunction: isNotEmpty,
    defaultValue: snippet?.code ? snippet.code : "",
  });

  const resetFormFunction = () => {
    name.reset();
    language.reset();
    description.reset();
    code.reset();
  };

  const formIsValid =
    name.isValid && language.isValid && description.isValid && code.isValid;

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const formData = {
      name: name.value,
      language: language.value,
      description: description.value,
      code: code.value,
    };

    if (!formIsValid) return;
    if (snippet) {
      props.onEditSnippet(formData);
    } else {
      props.onCreateNewSnippet(formData);
    }

    if (!props.error) {
      setTimeout(() => {
        resetFormFunction();
        navigate("/");
      }, 300);
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
            resetFormFunction();
            navigate("/");
          }}
        >
          <p>If you continue, all your data on this form will be lost.</p>
        </Modal>
      )}
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <Input
            inputConfig={{
              label: "Name",
              type: "text",
              id: "name",
              name: "name",
              placeholder: "ex. Console Log",
              inputHasError: name.hasError,
              errorMessage: "should not be empty",
              value: name.value,
              onChange: name.onChangeHandler,
              onBlur: name.onBlurHandler,
            }}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="language">
            Language
            {language.hasError && (
              <span className={classes.error}> should not be empty</span>
            )}
          </label>
          <select
            className={language.hasError ? classes.inputError : null}
            id="language"
            name="language"
            value={language.value}
            onChange={language.onChangeHandler}
            onBlur={language.onBlurHandler}
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
            {description.hasError && (
              <span className={classes.error}> should not be empty</span>
            )}
          </label>
          <textarea
            name="description"
            id="description"
            rows="3"
            placeholder="ex. Logs to the console"
            value={description.value}
            onChange={description.onChangeHandler}
            onBlur={description.onBlurHandler}
          ></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor="code">
            Code
            {code.hasError && (
              <span className={classes.error}> should not be empty</span>
            )}
          </label>
          <textarea
            name="code"
            id="code"
            rows="10"
            placeholder="ex. console.log('helloworld')"
            value={code.value}
            onChange={code.onChangeHandler}
            onBlur={code.onBlurHandler}
          ></textarea>
        </div>
        {props.isLoading ? (
          <Loading />
        ) : (
          <div className={classes.actions}>
            <button
              type="button"
              className={`${classes.clear} ${classes.button}`}
              onClick={resetFormFunction}
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
