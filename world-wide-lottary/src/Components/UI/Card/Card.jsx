import { useState } from "react";
import "./Card.css";
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
    <div className="Card">
      <div className="card-img">
        <img src={props.user.picture} alt={props.fullName} />
      </div>
      <div className="card-info">
        <div className="card-info-fullname">
          <h3 className="card-title">{props.user.fullName}</h3>
          <div className="card-info-location">
            <span>{props.user.location}</span>
          </div>
        </div>
        <div className="card-info-user-info">
          <p>
            Email:{" "}
            <span>
              {showEditEmail ? emailInput : editedEmail}{" "}
              <span
                className="edit-icon"
                onClick={() => setShowEditEmail(!showEditEmail)}
              >
                {showEditEmail ? (
                  <FontAwesomeIcon
                    className="card-info-font-icon"
                    icon={faCheck}
                    onClick={() => onSaveHandler()}
                  />
                ) : (
                  <FontAwesomeIcon
                    className="card-info-font-icon"
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
