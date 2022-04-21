import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { FIREBASE } from "../helpers/helpers";
import NoDataBoundary from "../components/UI/NoDataBoundary/NoDataBoundary";
import { useStore } from "../store/store";
import EditSnippet from "../containers/EditSnippet/EditSnippet";
const EditSnippetPage = (props) => {
  const [{ userId }] = useStore();
  const params = useParams();
  const { snippetId } = params;
  const [snippet, setSnippet] = useState({});
  const { sendRequest: getSnippetById, isLoading, error } = useHttp();

  useEffect(() => {
    getSnippetById(
      { url: FIREBASE + `snippets/${userId}/${snippetId}.json` },
      (data) => {
        setSnippet({
          id: snippetId,
          ...data,
        });
      }
    );
  }, [getSnippetById, snippetId]);
  return (
    <NoDataBoundary isLoading={isLoading} data={snippet}>
      {error && <h3>Error: {error}</h3>}
      <EditSnippet snippet={snippet} />
    </NoDataBoundary>
  );
};

export default EditSnippetPage;
