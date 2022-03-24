import classes from "./ListItem.module.css";
const ListItem = (props) => {
  return (
    <li
      className={
        props.user.isWinner
          ? `${classes.ListItem} ${classes.winner}`
          : classes.ListItem
      }
    >
      <div className={classes["list-item-thumbnail"]}>
        <img src={props.user.picture} alt={props.user.fullName} />
      </div>
      <div className={classes["list-item-border"]}></div>
      <div className={classes["list-item-body"]}>
        <div className={classes["list-item-info-container"]}>
          <h4>{props.user.fullName}</h4>
        </div>
        <div className={classes["list-item-border"]}></div>
        <div className={classes["list-item-info-container"]}>
          <p>{props.user.email}</p>
          <p>Gender: {props.user.gender}</p>
        </div>
        <div className={classes["list-item-border"]}></div>
        <div className={classes["list-item-info-container"]}>
          <span>{props.user.location}</span>
          <p>{props.user.nat}</p>
        </div>
        <div className={classes["list-item-border"]}></div>
        <div className={classes["list-item-info-container"]}>
          <h4>Time: {props.user.time.slice(11, 19)}</h4>
          <h6>{props.user.time.slice(0, 10)}</h6>
        </div>
      </div>
    </li>
  );
};

export default ListItem;
