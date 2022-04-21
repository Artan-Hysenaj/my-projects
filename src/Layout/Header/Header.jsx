import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/store";
import Button from "../../components/UI/Button/Button";
import classes from "./Header.module.css";
const Header = ({ title, subtitle }) => {
  const [{ isAuthenticated }] = useStore();

  const navigate = useNavigate();
  return (
    <header>
      <h1 className={classes.title}>{title}</h1>
      {subtitle && <p className={classes.subtitle}>{subtitle}</p>}
      {!isAuthenticated && (
        <Button title="Login" onClick={() => navigate("/authenticate")} />
      )}
    </header>
  );
};

export default Header;
