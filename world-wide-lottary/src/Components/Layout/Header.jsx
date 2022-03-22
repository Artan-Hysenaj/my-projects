import React from "react";
import "./Header.css";
import Navigation from "./Navigation/Navigation";
const Header = (props) => {
  return (
    <div className="Header">
      <h2>World Wide Lottary</h2>
      <Navigation />
    </div>
  );
};

export default Header;
