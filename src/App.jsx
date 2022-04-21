import Layout from "./Layout/Layout";
import { AUTOLOGIN } from "./store/auth-store";
import { useStore } from "./store/store";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthenticatePage from "./pages/AuthenticatePage";
import NotFoundPage from "./pages/NotFoundPage";
import NewSnippetPage from "./pages/NewSnippetPage";
import EditSnippetPage from "./pages/EditSnippetPage";
import MySnippetsPage from "./pages/MySnippetsPage";
import JavaScriptPage from "./pages/languages/JavaScriptPage";
import ReactJSPage from "./pages/languages/ReactJSPage";
function App() {
  const [state, dispatch] = useStore();
  const { isAuthenticated } = state;
  useEffect(() => {
    dispatch(AUTOLOGIN);
  }, []);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate replace to="welcome" />} />
        <Route path="/welcome" element={<HomePage />} />
        {!isAuthenticated && (
          <Route path="/authenticate" element={<AuthenticatePage />} />
        )}
        <Route path="/java-script" element={<JavaScriptPage />} />
        <Route path="/react-js" element={<ReactJSPage />} />
        <Route path="*" element={<NotFoundPage />} />
        {isAuthenticated && (
          <>
            <Route path="/my-snippets" element={<MySnippetsPage />} />
            <Route path="/new-snippet" element={<NewSnippetPage />} />
            <Route
              path="/edit-snippet/:snippetId"
              element={<EditSnippetPage />}
            />
          </>
        )}
      </Routes>
    </Layout>
  );
}

export default App;
