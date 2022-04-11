import React, { useState } from "react";
import NewSnippetForm from "./NewSnippetForm/NewSnippetForm";
import Wrapper from "../UI/Wrapper/Wrapper";
import useHttp from "../../hooks/use-http";
import { FIREBASE } from "../../util/utilities";
import { useStore } from "../../store/store";
// import classes from "./NewSnippet.module.css";
const NewSnippet = (props) => {
  const [state] = useStore();
  const { userId } = state;
  const { sendRequest: createSnippet, isLoading, error } = useHttp();
  const createNewSnippetHandler = (snippet) => {
    createSnippet({
      url: FIREBASE + "snippets.json",
      method: "POST",
      body: { ...snippet, userId },
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
