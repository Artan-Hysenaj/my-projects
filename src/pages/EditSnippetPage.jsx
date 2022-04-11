import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { FIREBASE } from "../util/utilities";
import NewSnippetForm from "../components/NewSnippet/NewSnippetForm/NewSnippetForm";
import Loading from "../components/UI/Loading/Loading";
const EditSnippetPage = (props) => {
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
      { url: FIREBASE + `snippets/${snippetId}.json` },
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


