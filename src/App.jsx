import Layout from "./components/Layout/Layout";
import { AUTOLOGIN } from "./store/auth-store";
import { useStore } from "./store/store";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthenticatePage from "./pages/AuthenticatePage";
import NotFoundPage from "./pages/NotFoundPage";
import NewSnippetPage from "./pages/NewSnippetPage";
import EditSnippetPage from "./pages/EditSnippetPage";
function App() {
  const [state, dispatch] = useStore();
  const { isAuthenticated } = state;
  useEffect(() => {
    dispatch(AUTOLOGIN);
  }, []);
  const privateRoutes = (
    <>
      {isAuthenticated && (
        <>
          <Route path="/new-snippet" element={<NewSnippetPage />} />
          <Route
            path="/edit-snippet/:snippetId"
            element={<EditSnippetPage />}
          />
        </>
      )}
    </>
  );
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate replace to="welcome" />} />
        <Route path="/welcome" element={<HomePage />} />
        {!isAuthenticated && (
          <Route path="/authenticate" element={<AuthenticatePage />} />
        )}
        <Route path="*" element={<NotFoundPage />} />
        {privateRoutes}
      </Routes>
    </Layout>
  );
}

export default App;
