import React, { useState } from "react";
import { Link } from "react-router-dom";
import NewSnippetForm from "../../NewSnippet/NewSnippetForm/NewSnippetForm";
import Modal from "../../UI/Modal/Modal";
import Code from "../Code/Code";
import classes from "./Snippet.module.css";
const Snippet = ({ snippet, onDeleteSnippet }) => {
  const { id, language, name, description, code } = snippet;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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
        <Code code={code} />
        {true && (
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
