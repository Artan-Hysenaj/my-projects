import React from "react";
import NewSnippetForm from "./NewSnippetForm/NewSnippetForm";
import Wrapper from "../UI/Wrapper/Wrapper";
import classes from "./NewSnippet.module.css";
const NewSnippet = (props) => {
  return (
    <>
      <h1>New snippet form</h1>
      <Wrapper>
        <NewSnippetForm />
      </Wrapper>
    </>
  );
};

export default NewSnippet;
