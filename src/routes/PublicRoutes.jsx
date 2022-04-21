import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthenticatePage from "../pages/AuthenticatePage";
import HomePage from "../pages/HomePage";
import JavaScriptPage from "../pages/languages/JavaScriptPage";
import ReacJSPage from "../pages/languages/ReacJSPage";
import NotFoundPage from "../pages/NotFoundPage";
const PublicRoutes = (props) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/authenticate" element={<AuthenticatePage />} />
      <Route path="/java-script" element={<JavaScriptPage />} />
      <Route path="/react-js" element={<ReacJSPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default PublicRoutes;
