import React from "react";
import { useParams } from "react-router-dom";
import NewSnippetForm from "../../components/NewSnippetForm/NewSnippetForm";
import Wrapper from "../../components/UI/Wrapper/Wrapper";
import useHttp from "../../hooks/use-http";
import { FIREBASE } from "../../helpers/helpers";
import { useStore } from "../../store/store";
const EditSnippet = (props) => {
  const { snippet } = props;
  const { snippetId } = useParams();
  const [{ userId }] = useStore();

  const { sendRequest: editSnippetById, isLoadingEdit, errorEdit } = useHttp();

  const editSnippetHandler = (snippetData) => {
    editSnippetById({
      url: FIREBASE + `snippets/${userId}/${snippetId}.json`,
      method: "PUT",
      body: snippetData,
    });
  };

  if (errorEdit) console.log("Edit snippet", errorEdit);

  return (
    <>
      <h1>Edit: {snippet.name}</h1>
      <Wrapper>
        <NewSnippetForm
          onEditSnippet={editSnippetHandler}
          snippet={snippet}
          isLoading={isLoadingEdit}
          error={errorEdit}
        />
      </Wrapper>
    </>
  );
};

export default EditSnippet;
