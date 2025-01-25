import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './index.css'

import { App } from "@/core/app";

function start() {
  // TODO init sentry
  try {
    const rootElement = document.createElement("div");
    document.body.prepend(rootElement);
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  } catch (error) {
    console.error("Failed to start app:", error);
  }
}

start();
