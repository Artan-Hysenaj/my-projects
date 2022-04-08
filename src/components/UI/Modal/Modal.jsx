import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop}></div>;
};

const ModalOverlay = (props) => {
  const { title, onClose, children } = props.modal;
  return (
    <div className={classes.modal}>
      <header className={classes.header}>
        <h1>{title}</h1>
      </header>
      <div className={classes.content}>{children}</div>
      <footer className={classes.actions}>
        <button
          onClick={onClose}
          className={`${classes.action} ${classes.action1}`}
        >
          Cancel
        </button>
        <button
          onClick={() => console.log("delete modal")}
          className={`${classes.action} ${classes.action2}`}
        >
          Delete
        </button>
      </footer>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay modal={props} />, portalElement)}
    </>
  );
};

export default Modal;
