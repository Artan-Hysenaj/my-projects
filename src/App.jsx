import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import NewSnippetPage from "./pages/NewSnippetPage";
import EditSnippetPage from "./pages/EditSnippetPage";
import NotFoundPage from "./pages/NotFoundPage";
import { getAllSnippets } from "./api/api";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate replace to="welcome" />} />
        <Route path="/welcome" element={<HomePage />} />
        <Route path="/new-snippet" element={<NewSnippetPage />} />
        <Route
          path="/edit-snippet/:snippetName"
          element={<EditSnippetPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
