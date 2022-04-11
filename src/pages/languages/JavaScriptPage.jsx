import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header/Header";
import Snippets from "../../components/Snippets/Snippets";
import useHttp from "../../hooks/use-http";
import { SET } from "../../store/snippets-store";
import { useStore } from "../../store/store";
import {
  FIREBASE,
  transformIncomingJavaScriptSnippets,
} from "../../util/utilities";
const JavaScriptPage = (props) => {
  const [_, dispatch] = useStore();
  const { sendRequest: fetchSnippets, isLoading, error } = useHttp();
  const fetchSnippetsHandler = (data) => {
    const javascriptSnippets = transformIncomingJavaScriptSnippets(data);
    dispatch(SET, { snippets: javascriptSnippets });
  };
  useEffect(() => {
    fetchSnippets(
      {
        url: FIREBASE + `snippets.json`,
      },
      fetchSnippetsHandler
    );
  }, []);
  return (
    <>
      <Header title="JavaScript Snippets" subtitle="" />

      <Snippets isLoading={isLoading} hasOwnerPermissions={false} />
    </>
  );
};

export default JavaScriptPage;
