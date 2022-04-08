import React from "react";
import NoDataBoundary from "../UI/NoDataBoundary/NoDataBoundary";
import Wrapper from "../UI/Wrapper/Wrapper";
import Snippet from "./Snippet/Snippet";
import classes from "./Snippets.module.css";
const Snippets = ({ snippets, isLoading }) => {
  return (
    <Wrapper>
      <NoDataBoundary data={snippets} isLoading={isLoading}>
        <ul className={classes.snippets}>
          {snippets.map((snippet) => {
            return <Snippet key={snippet.id} snippet={snippet} />;
          })}
        </ul>
      </NoDataBoundary>
    </Wrapper>
  );
};

export default Snippets;
