import { useCallback, useEffect } from "react";
import Header from "../Layout/Header/Header";
import Snippets from "../containers/Snippets/Snippets";
import useHttp from "../hooks/use-http";
import { SET } from "../store/snippets-store";
import { useStore } from "../store/store";
import { FIREBASE, transfomIncomingDataToArray } from "../helpers/helpers";
const HomePage = (props) => {
  const [_, dispatch] = useStore();
  const { sendRequest: fetchSnippets, isLoading, error } = useHttp();

  const getSnippets = useCallback((data) => {
    const transformedData = transfomIncomingDataToArray(data);
    dispatch(SET, { snippets: transformedData });
  }, []);

  useEffect(() => {
    fetchSnippets({ url: FIREBASE + "snippets.json" }, getSnippets);
  }, [getSnippets]);
  if (error) console.log("Home page error: ", error);
  return (
    <>
      <Header
        title="Errday Snippets"
        subtitle="Create and browse snippets you see and use every day"
      />

      <Snippets isLoading={isLoading} hasOwnerPermissions={false} />
    </>
  );
};

export default HomePage;
