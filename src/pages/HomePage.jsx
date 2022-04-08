import React, { useEffect, useState, useCallback } from "react";
import { getAllSnippets } from "../api/api";
import Header from "../components/Layout/Header/Header";
import Snippets from "../components/Snippets/Snippets";
import { SET } from "../store/snippets-store";
import { useStore } from "../store/store";
const HomePage = (props) => {
  const [state, dispatch] = useStore();
  const { snippets, isLoading } = state;

  const getSnippets = useCallback(async () => {
    const responseData = await getAllSnippets();
    dispatch(SET, { snippets: responseData });
  }, []);

  useEffect(() => {
    getSnippets();
  }, [getSnippets]);

  return (
    <>
      <Header
        title="Errday Snippets"
        subtitle="Create and browse snippets you see and use every day"
      />

      <Snippets snippets={snippets} isLoading={isLoading} />
    </>
  );
};

export default HomePage;
