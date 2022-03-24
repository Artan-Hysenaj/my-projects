import React from "react";
import classes from "./Header.module.css";
import Navigation from "./Navigation/Navigation";
const Header = (props) => {
  return (
    <div className={classes.Header}>
      <h2>World Wide Lottary</h2>
      <Navigation />
    </div>
  );
};

export default Header;
