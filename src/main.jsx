import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import configureSnippetsStore from "./store/snippets-store";
import configureAuthStore from "./store/auth-store";
import "./index.css";

configureSnippetsStore();
configureAuthStore();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
