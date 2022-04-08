import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../UI/Modal/Modal";
import Code from "../Code/Code";
import classes from "./Snippet.module.css";
const Snippet = ({ snippet }) => {
  const { language, name, description, code } = snippet;
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal && (
        <Modal title={`Delete ${name}?`} onClose={() => setShowModal(false)}>
          <>
            <p>
              Are you sure you want to delete <b>{name}?</b>
            </p>
            <p>You can't undo this action.</p>
          </>
        </Modal>
      )}
      <li className={classes.snippet}>
        <div className={classes["snippet-info"]}>
          <h2>{name}</h2>
          <span>{language}</span>
        </div>
        <p>{description}</p>
        <Code code={code} />
        {true && (
          <div className={classes.actions}>
            <Link to="/edit-snippet/1">
              <span>Edit</span>
            </Link>

            <span onClick={() => setShowModal(true)}>Delete</span>
          </div>
        )}
      </li>
    </>
  );
};

export default Snippet;
