import { Route, Switch } from "wouter";

import { HomeContainer } from "@/feature/home/home-container.tsx";
import { PokemonDetailContainer } from "@/feature/pokemon-detail/pokemon-detail-container.tsx";

export function Router() {
  return (
    <Switch>
      <Route path="/" component={HomeContainer} />
      <Route path="/pokemon/:pokedexId" component={PokemonDetailContainer} />
    </Switch>
  );
}
