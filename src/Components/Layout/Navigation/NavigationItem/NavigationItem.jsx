import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";
const NavigationItem = (props) => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        activeClassName={classes.active}
        className={classes["navigation-link"]}
        to={props.link}
      >
        {props.page}
      </NavLink>
    </li>
  );
};

export default NavigationItem;
