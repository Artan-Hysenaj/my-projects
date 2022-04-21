import React from "react";
import { useStore } from "../../store/store";
import useHttp from "../../hooks/use-http";
import NoDataBoundary from "../../components/UI/NoDataBoundary/NoDataBoundary";
import Wrapper from "../../components/UI/Wrapper/Wrapper";
import Snippet from "../../components/Snippet/Snippet";
import { FIREBASE } from "../../helpers/helpers";
import { REMOVE } from "../../store/snippets-store";
import classes from "./Snippets.module.css";
const Snippets = ({ isLoading, hasOwnerPermissions }) => {
  const [state, dispatch] = useStore();
  const { snippets } = state;
  const { sendRequest: deleteSnippet, error } = useHttp();

  const deleteSnippetHandler = (id) => {
    deleteSnippet({
      url: FIREBASE + `snippets/${state.userId}/${id}.json`,
      method: "DELETE",
    });

    dispatch(REMOVE, { id });
  };

  if (error) console.log("delete snippet error: ", error);

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
                hasOwnerPermissions={hasOwnerPermissions}
              />
            );
          })}
        </ul>
      </NoDataBoundary>
    </Wrapper>
  );
};

export default Snippets;
