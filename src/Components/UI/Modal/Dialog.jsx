import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import Button from "../Button/Button";
import "./Dialog.css";
import WinnerSound from "../../../assets/Winner.mp3";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/ui-slice";
Modal.setAppElement("#root");
function Dialog(props) {
  const showDialog = useSelector((state) => state.ui.showDialog);
  const user = useSelector((state) => state.user.generatedUser);
  const dispatch = useDispatch();
  const audio = new Audio(WinnerSound);
  useEffect(() => {
    if (showDialog) audio.play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDialog]);
  const showDialogHandler = () => {
    dispatch(uiActions.showDialog());
  };

  return (
    <Modal id="Dialog" isOpen={showDialog && !!user}>
      <div className="dialog-content">
        <div className="content-img">
          <FontAwesomeIcon className="content-icon" icon={faTrophy} />
        </div>
        <div className="content-info">
          <h1>Winner</h1>
          <h3>{user.fullName}</h3>
        </div>
      </div>
      <div className="dialog-controls">
        <Button
          className="controls-btn"
          typ="button"
          buttonValue="Close"
          buttonFunction={showDialogHandler}
        />
      </div>
    </Modal>
  );
}
export default Dialog;
