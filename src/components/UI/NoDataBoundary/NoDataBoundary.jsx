import React from "react";
import Loading from "../Loading/Loading";
import classes from "./NoDataBoundary.module.css";
import noData from "../../../assets/images/noData.png";
const NoDataBoundary = (props) => {
  const { data, isLoading } = props;
  const showContent = data && data.length !== 0 && !isLoading;
  return (
    <div>
      {isLoading && <Loading />}
      {!showContent && !isLoading && (
        <div className={classes.info}>
          <h2>Oops... No Data Found</h2>
          <img src={noData} alt="not found image" />
        </div>
      )}
      {showContent && <main>{props.children}</main>}
    </div>
  );
};

export default NoDataBoundary;
