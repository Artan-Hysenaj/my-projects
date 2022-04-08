import React from "react";
import classes from "./Layout.module.css";
import Navigation from "./Navigation/Navigation";
const Layout = ({ children }) => {
  return (
    <div className={classes.layout}>
      <header className={classes.header}>
        <Navigation />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
