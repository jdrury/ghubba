import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router";
import { createRoot } from "react-dom/client";

import { AppLayout } from "@/core/app-layout";
import { AppContext } from "@/core/app-context.tsx";
import { Home, loader } from "@/feature/home/home";

import "./index.css";

function start() {
  try {
    const rootElement = document.createElement("div");

    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route element={<AppLayout />}>
          <Route index loader={() => loader({})} element={<Home />} />
        </Route>,
      ),
    );
    document.body.prepend(rootElement);
    createRoot(rootElement).render(
      <AppContext>
        <RouterProvider router={router} />{" "}
      </AppContext>,
    );
  } catch (error) {
    console.error("Failed to start app:", error);
  }
}

start();
