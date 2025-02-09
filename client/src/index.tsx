import { createRoot } from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router";

import { AppLayout } from "@/core/app-layout";
import { Home, loader } from "@/feature/home/home";
import { RelayProvider } from "@/lib/relay/provider";

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
      <RelayProvider>
        <RouterProvider router={router} />{" "}
      </RelayProvider>,
    );
  } catch (error) {
    console.error("Failed to start app:", error);
  }
}

start();
