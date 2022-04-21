import React from "react";
import NewSnippetForm from "../../components/NewSnippetForm/NewSnippetForm";
import Wrapper from "../../components/UI/Wrapper/Wrapper";
import useHttp from "../../hooks/use-http";
import { FIREBASE } from "../../helpers/helpers";
import { useStore } from "../../store/store";
const NewSnippet = (props) => {
  const [state] = useStore();
  const { userId } = state;
  const { sendRequest: createSnippet, isLoading, error } = useHttp();
  const createNewSnippetHandler = (snippet) => {
    createSnippet({
      url: FIREBASE + `snippets/${userId}.json`,
      method: "POST",
      body: snippet,
    });
  };
  if (error) console.log("Add new snippet", error);
  return (
    <>
      <h1>New snippet form</h1>
      <Wrapper>
        <NewSnippetForm
          onCreateNewSnippet={createNewSnippetHandler}
          isLoading={isLoading}
          error={error}
        />
      </Wrapper>
    </>
  );
};

export default NewSnippet;
