import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./types/index.css";

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("Root element not found. Check your index.html file.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);