import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
