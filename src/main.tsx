
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Make sure DOM is fully loaded before rendering
const renderApp = () => {
  const root = document.getElementById("root");
  
  // Debug information
  console.log("React application starting...");
  console.log("Environment:", import.meta.env.MODE);
  console.log("Root element found:", Boolean(root));

  if (!root) {
    console.error("Root element not found!");
  } else {
    try {
      ReactDOM.createRoot(root).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
      console.log("React application mounted successfully");
    } catch (error) {
      console.error("Error rendering React application:", error);
    }
  }
};

// Check if document is already loaded or wait for it
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderApp);
} else {
  renderApp();
}
