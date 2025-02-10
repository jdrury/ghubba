import { RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";

import { AppContext } from "@/core/app-context.tsx";
import { router } from "@/core/router.tsx";

import "./index.css";

function start() {
  try {
    const rootElement = document.createElement("div");
    document.body.prepend(rootElement);
    createRoot(rootElement).render(
      <AppContext>
        <RouterProvider router={router} />
      </AppContext>,
    );
  } catch (error) {
    console.error("Failed to start app:", error);
  }
}

start();
