import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import 'primereact/resources/primereact.css';                       // core css
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();