import { Route, Switch } from "wouter";

import { HomeContainer } from "@/feature/home/home-container.tsx";

export function Router() {
  return (
    <Switch>
      <Route path="/" component={HomeContainer} />
    </Switch>
  );
}
