import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../UI/Modal/Modal";
import Code from "./Code/Code";
import classes from "./Snippet.module.css";

const Snippet = ({ snippet, onDeleteSnippet, hasOwnerPermissions }) => {
  const { id, language, name, description, code } = snippet;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const showCodeButton = (
    <button
      className={classes["show-button"]}
      onClick={() => setShowCode((prevState) => !prevState)}
    >
      {showCode ? "Hide the Code" : "Show the Code 👇"}
    </button>
  );
  const deleteConfirmationModal = showDeleteModal && (
    <Modal
      title={`Delete ${name}?`}
      onClose={() => setShowDeleteModal(false)}
      onConfirm={onDeleteSnippet.bind(null, id)}
    >
      <>
        <p>
          Are you sure you want to delete <b>{name}?</b>
        </p>
        <p>You can't undo this action.</p>
      </>
    </Modal>
  );

  return (
    <>
      {deleteConfirmationModal}
      <li className={classes.snippet}>
        <div className={classes["snippet-info"]}>
          <h2>{name}</h2>
          <span>{language}</span>
        </div>
        <p>{description}</p>
        {showCodeButton}
        <Code code={code} showCode={showCode} />
        {hasOwnerPermissions && (
          <div className={classes.actions}>
            <Link to={`/edit-snippet/${id}`}>
              <span>Edit</span>
            </Link>
            <span onClick={() => setShowDeleteModal(true)}>Delete</span>
          </div>
        )}
      </li>
    </>
  );
};

export default Snippet;
