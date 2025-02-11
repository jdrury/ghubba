import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";

import { AppLayout } from "@/core/app-layout";
import { UserDetail, loadUser } from "@/feature/user-detail/user-detail.tsx";
import {
  loadRepository,
  RepositoryDetail,
} from "@/feature/repository-detail/repository-detail";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route index element={<p>This is ghubba</p>} />
      <Route path=":login" loader={loadUser} element={<UserDetail />} />
      <Route
        path=":login/:repository"
        loader={loadRepository}
        element={<RepositoryDetail />}
      />
    </Route>,
  ),
);

export { router };
