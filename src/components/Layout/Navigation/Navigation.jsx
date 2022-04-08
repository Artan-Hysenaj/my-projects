import React from "react";
import { NavLink, Link } from "react-router-dom";
import classes from "./Navigation.module.css";
const Navigation = (props) => {
  return (
    <nav className={classes.navigation}>
      <Link to="/" className={classes.title}>
        Errday Snippets
      </Link>
      <ul className={classes["nav-items"]}>
        <li className={classes["nav-item"]}>
          <NavLink
            className={(navData) =>
              navData.isActive
                ? `${classes["nav-item-link"]} ${classes.active}`
                : classes["nav-item-link"]
            }
            to="/new-snippet"
          >
            New Snippet
          </NavLink>
        </li>
        <li className={classes["nav-item"]}>
          <NavLink
            className={(navData) =>
              navData.isActive
                ? `${classes["nav-item-link"]} ${classes.active}`
                : classes["nav-item-link"]
            }
            to="/my-snippets"
          >
            My Snippets
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
