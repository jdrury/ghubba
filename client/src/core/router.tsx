import { Route, Switch } from "wouter";

import { HomeContainer } from "@/feature/home/home-container.tsx";
import { RepositoryDetailContainer } from "@/feature/repository-detail/repository-detail-container.tsx";

export function Router() {
  return (
    <Switch>
      <Route path="/" component={HomeContainer} />
      <Route path="/:login/:repository" component={RepositoryDetailContainer} />
    </Switch>
  );
}
