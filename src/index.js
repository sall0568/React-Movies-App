import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { reportWebVitals, sendToAnalytics } from "./utils/webVitals";
import App from "./App";
import "./styles/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

reportWebVitals(sendToAnalytics);
