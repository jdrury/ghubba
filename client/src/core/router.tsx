import { Route, Switch } from "wouter";

import { HomeContainer } from "@/feature/home/home-container.tsx";
import { Logout } from "@/feature/auth/logout.tsx";

export function Router() {
  return (
    <Switch>
      <Route path="/" component={HomeContainer} />
      <Route path="/logout" component={Logout} />
    </Switch>
  );
}
