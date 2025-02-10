import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";

import { AppLayout } from "@/core/app-layout.tsx";
import { Home, loader as homeLoader } from "@/feature/home/home.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route index loader={homeLoader} element={<Home />} />
    </Route>,
  ),
);

export { router };
