import { Route, Routes } from "react-router-dom";
import MySnippetsPage from "../pages/MySnippetsPage";
import NewSnippetPage from "../pages/NewSnippetPage";
import EditSnippetPage from "../pages/EditSnippetPage";
const PrivateRoutes = (props) => {
  return (
    <Routes>
      <Route path="/my-snippets" element={<MySnippetsPage />} />
      <Route path="/new-snippet" element={<NewSnippetPage />} />
      <Route path="/edit-snippet/:snippetId" element={<EditSnippetPage />} />
    </Routes>
  );
};

export default PrivateRoutes;
