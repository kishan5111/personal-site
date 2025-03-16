
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root");

// Debug information
console.log("React application starting...");
console.log("Environment:", import.meta.env.MODE);
console.log("Root element found:", Boolean(root));

if (!root) {
  console.error("Root element not found!");
} else {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("React application mounted");
}
