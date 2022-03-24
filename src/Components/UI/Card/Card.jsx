import { useState } from "react";
import classes from "./Card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPencil } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { userActions } from "../../../store/user-slice";
const Card = (props) => {
  const dispatch = useDispatch();
  const [showEditEmail, setShowEditEmail] = useState(false);
  const [editedEmail, setEditedEmail] = useState(props.user.email);
  const emailInput = (
    <input
      type="text"
      name="email"
      id="email"
      value={editedEmail}
      onChange={(event) => setEditedEmail(event.target.value)}
    />
  );
  const onSaveHandler = () => {
    dispatch(
      userActions.editUser({
        id: props.user.id,
        email: editedEmail,
      })
    );
  };

  return (
    <div className={classes.Card}>
      <div className={classes["card-img"]}>
        <img src={props.user.picture} alt={props.fullName} />
      </div>
      <div className={classes["card-info"]}>
        <div className={classes["card-info-fullname"]}>
          <h3 className={classes["card-title"]}>{props.user.fullName}</h3>
          <div className={classes["card-info-location"]}>
            <span>{props.user.location}</span>
          </div>
        </div>
        <div className={classes["card-info-user-info"]}>
          <p>
            Email:{" "}
            <span>
              {showEditEmail ? emailInput : editedEmail}{" "}
              <span
                className={classes["edit-icon"]}
                onClick={() => setShowEditEmail(!showEditEmail)}
              >
                {showEditEmail ? (
                  <FontAwesomeIcon
                    className={classes["card-info-font-icon"]}
                    icon={faCheck}
                    onClick={() => onSaveHandler()}
                  />
                ) : (
                  <FontAwesomeIcon
                    className={classes["card-info-font-icon"]}
                    icon={faPencil}
                  />
                )}
              </span>
            </span>
          </p>
          <p>
            Gender: <span>{props.user.gender}</span>
          </p>
          <p>
            Nationality: <span>{props.user.nat}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
