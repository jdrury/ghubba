import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";

import { AppLayout } from "@/core/app-layout.tsx";
import { Home, loader } from "@/feature/home/home.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route index loader={() => loader({})} element={<Home />} />
    </Route>,
  ),
);

export { router };
