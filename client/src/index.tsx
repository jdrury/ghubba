import { createRoot } from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router";

import { AppLayout } from "./core/app-layout";

import "./index.css";
import { Home, loader } from "./feature/home/home";
import { RelayProvider } from "./lib/relay/provider";

function start() {
  // TODO(jimmy): init sentry
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
