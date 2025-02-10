import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";

import { AppLayout } from "@/core/app-layout";
import { User, loadUser } from "@/feature/user/user.tsx";
import {
  loadRepository,
  RepositoryDetail,
} from "@/feature/repository-detail/repository-detail";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route index element={<h2>Search for a user</h2>} />
      <Route path=":login" loader={loadUser} element={<User />}>
        <Route
          path=":repository"
          loader={loadRepository}
          element={<RepositoryDetail />}
        />
      </Route>
    </Route>,
  ),
);

export { router };
