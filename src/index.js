import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Library
import "bootstrap/dist/css/bootstrap.min.css";

import { UserProvider } from "./Contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  // </React.StrictMode>
);
