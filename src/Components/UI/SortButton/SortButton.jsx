import "./SortButton.css";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const SortButton = (props) => {
  const [sortDesc, setSortDesc] = useState(true);
  const [buttonIcon, setButtonIcon] = useState(
    <FontAwesomeIcon icon={faArrowDown} />
  );
  //toggle sort asc/desc icon
  const sortIconHandler = () => {
    if (sortDesc) {
      props.sortFunction("desc");
      setButtonIcon(<FontAwesomeIcon icon={faArrowDown} />);
    } else {
      props.sortFunction("asc");
      setButtonIcon(<FontAwesomeIcon icon={faArrowUp} />);
    }
    setSortDesc(!sortDesc);
  };

  return (
    <div className="SortButton">
      <span>Sort by {props.sortBy}</span>
      <Button
        type="button"
        buttonValue={buttonIcon}
        buttonFunction={sortIconHandler}
      />
    </div>
  );
};

export default SortButton;
