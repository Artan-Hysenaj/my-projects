import React from "react";
import Loading from "../Loading/Loading";
import classes from "./NoDataBoundary.module.css";
const image =
  "https://i.pinimg.com/originals/7a/1c/f2/7a1cf2206c2a112f413888d20794c323.png";
const NoDataBoundary = (props) => {
  const { data, isLoading } = props;
  const showContent = data && data.length !== 0;
  return (
    <div>
      {isLoading && <Loading />}
      {!showContent && !isLoading && (
        <div className={classes.info}>
          <h2>Oops... No Data Found</h2>
          <img src={image} alt="not found image" />
        </div>
      )}
      {showContent && <main>{props.children}</main>}
    </div>
  );
};

export default NoDataBoundary;
