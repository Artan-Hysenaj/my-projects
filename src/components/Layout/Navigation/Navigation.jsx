import React from "react";
import { NavLink, Link } from "react-router-dom";
import { LOGOUT } from "../../../store/auth-store";
import { useStore } from "../../../store/store";
import Button from "../../UI/Button/Button";
import classes from "./Navigation.module.css";
const Navigation = (props) => {
  const [state, dispatch] = useStore();
  const { isAuthenticated, email } = state;
  return (
    <nav className={classes.navigation}>
      <Link to="/" className={classes.title}>
        Errday Snippets
      </Link>
      <ul className={classes["nav-items"]}>
        <div className={classes.leftSide}>
          <li className={classes["nav-item"]}>
            <NavLink
              className={(navData) =>
                navData.isActive
                  ? `${classes["nav-item-link"]} ${classes.active}`
                  : classes["nav-item-link"]
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className={classes["nav-item"]}>
            <NavLink
              className={(navData) =>
                navData.isActive
                  ? `${classes["nav-item-link"]} ${classes.active}`
                  : classes["nav-item-link"]
              }
              to="/java-script"
            >
              JavaScript
            </NavLink>
          </li>
          <li className={classes["nav-item"]}>
            <NavLink
              className={(navData) =>
                navData.isActive
                  ? `${classes["nav-item-link"]} ${classes.active}`
                  : classes["nav-item-link"]
              }
              to="/react-js"
            >
              ReactJS
            </NavLink>
          </li>

          {isAuthenticated && (
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
          )}
          {isAuthenticated && (
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
          )}
        </div>
        <div className={classes.rightSide}>
          {isAuthenticated && (
            <li className={classes["nav-item-user"]}>
              <p>{email ?? "Artan"}</p>
            </li>
          )}
          {isAuthenticated && (
            <li className={classes["nav-item-button"]}>
              <Button title="Logout" onClick={() => dispatch(LOGOUT)} />
            </li>
          )}
          {!isAuthenticated && (
            <li className={classes["nav-item"]}>
              <NavLink
                className={(navData) =>
                  navData.isActive
                    ? `${classes["nav-item-link"]} ${classes.active}`
                    : classes["nav-item-link"]
                }
                to="/authenticate"
              >
                Login
              </NavLink>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navigation;
