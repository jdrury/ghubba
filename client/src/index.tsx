import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import { AppLayout } from "./core/app-layout";

import "./index.css";

function start() {
  // TODO(jimmy): init sentry
  try {
    const rootElement = document.createElement("div");
    document.body.prepend(rootElement);
    createRoot(rootElement).render(

      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<p> hello </p>} />
          </Route>
        </Routes>
      </BrowserRouter>

    );
  } catch (error) {
    console.error("Failed to start app:", error);
  }
}

start();
