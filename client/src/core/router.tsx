import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";

import { AppLayout } from "@/core/app-layout";
import { Home, loader as homeLoader } from "@/feature/home/home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route index element={<h1>Search for user by handle</h1>} />
      <Route path=":login" loader={homeLoader} element={<Home />} />
    </Route>,
  ),
);

export { router };
