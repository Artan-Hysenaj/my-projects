import React from "react";
import Button from "../../UI/Button/Button";
import classes from "./Header.module.css";
const Header = ({ title, subtitle }) => {
  return (
    <section>
      <h1 className={classes.title}>{title}</h1>
      {subtitle && <p className={classes.subtitle}>{subtitle}</p>}
      <Button title="Login" onClick={() => {}} />
    </section>
  );
};

export default Header;
