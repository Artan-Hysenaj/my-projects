import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { FIREBASE } from "../util/utilities";
import NewSnippetForm from "../components/NewSnippet/NewSnippetForm/NewSnippetForm";
import Loading from "../components/UI/Loading/Loading";
import { useStore } from "../store/store";
const EditSnippetPage = (props) => {
  const [{ userId }] = useStore();
  const params = useParams();
  const { snippetId } = params;
  const [snippet, setSnippet] = useState({});
  const { sendRequest: getSnippetById, isLoading, error } = useHttp();

  const transformFetchedDataHandler = (data) => {
    setSnippet({
      id: snippetId,
      ...data,
    });
  };

  useEffect(() => {
    getSnippetById(
      { url: FIREBASE + `snippets/${userId}/${snippetId}.json` },
      transformFetchedDataHandler
    );
  }, [getSnippetById, snippetId]);
  return (
    <>
      <h1>Edit {snippet.name}</h1>
      {isLoading && <Loading />}
      {error && <h3>Error: {error}</h3>}
      {!isLoading && <NewSnippetForm snippet={snippet} />}
    </>
  );
};

export default EditSnippetPage;
