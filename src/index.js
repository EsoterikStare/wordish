import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { AppStateProvider } from "./AppStateContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </StrictMode>,
  rootElement
);
