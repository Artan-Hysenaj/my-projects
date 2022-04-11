import React, { useCallback, useEffect } from "react";
import Header from "../components/Layout/Header/Header";
import Snippets from "../components/Snippets/Snippets";
import useHttp from "../hooks/use-http";
import { SET } from "../store/snippets-store";
import { useStore } from "../store/store";
import { FIREBASE, transformIncomingMySnippets } from "../util/utilities";
const MySnippetsPage = (props) => {
  const [state, dispatch] = useStore();
  const { sendRequest: fetchSnippets, isLoading, error } = useHttp();
  const getSnippets = useCallback((data) => {
    const transformedData = transformIncomingMySnippets(data);
    dispatch(SET, { snippets: transformedData });
  }, []);

  useEffect(() => {
    fetchSnippets(
      { url: FIREBASE + `snippets/${state.userId}.json` },
      getSnippets
    );
  }, [getSnippets]);
  if (error) console.log("Error my snippets page: ", error);
  return (
    <>
      <Header title="My Snippets" subtitle="The snippets that I have created" />
      <Snippets isLoading={isLoading} hasOwnerPermissions={true} />
    </>
  );
};

export default MySnippetsPage;
