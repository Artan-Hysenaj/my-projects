import React, { useEffect, useCallback } from "react";
import { useStore } from "../../store/store";
import useHttp from "../../hooks/use-http";
import NoDataBoundary from "../UI/NoDataBoundary/NoDataBoundary";
import Wrapper from "../UI/Wrapper/Wrapper";
import Snippet from "./Snippet/Snippet";
import { FIREBASE, transfomIncomingDataToArray } from "../../util/utilities";
import { REMOVE, SET } from "../../store/snippets-store";
import classes from "./Snippets.module.css";
const Snippets = () => {
  const [state, dispatch] = useStore();
  const { snippets } = state;
  const { sendRequest: fetchSnippets, isLoading, errorFetch } = useHttp();
  const { sendRequest: deleteSnippet, errorDelete } = useHttp();

  const getSnippets = useCallback((data) => {
    const transformedData = transfomIncomingDataToArray(data);
    dispatch(SET, { snippets: transformedData });
  }, []);

  useEffect(() => {
    fetchSnippets({ url: FIREBASE + "snippets.json" }, getSnippets);
  }, [getSnippets]);

  const deleteSnippetHandler = (id) => {
    deleteSnippet({
      url: FIREBASE + `snippets/${id}.json`,
      method: "DELETE",
    });

    dispatch(REMOVE, { id });
  };

  if (errorDelete) console.log("delete snippet error: ", error);
  if (errorFetch) console.log("fetching snippets error: ", error);

  return (
    <Wrapper>
      <NoDataBoundary data={snippets} isLoading={isLoading}>
        <ul className={classes.snippets}>
          {snippets.map((snippet) => {
            return (
              <Snippet
                key={snippet.id}
                snippet={snippet}
                onDeleteSnippet={deleteSnippetHandler}
              />
            );
          })}
        </ul>
      </NoDataBoundary>
    </Wrapper>
  );
};

export default Snippets;
