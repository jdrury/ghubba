import { useRoute } from "wouter";
import { useQueryLoader } from "react-relay";
import { Suspense, useEffect } from "react";

import { PokemonDetail } from "./pokemon-detail.tsx";

import pokemonDetailQueryNode, {
  pokemonDetailQuery,
} from "__generated__/pokemonDetailQuery.graphql";

export function PokemonDetailContainer() {
  const [match, params] = useRoute("/pokemon/:pokedexId");
  const [queryRef, loadQuery] = useQueryLoader<pokemonDetailQuery>(
    pokemonDetailQueryNode,
  );

  useEffect(() => {
    // TODO validate param "pokedexId" is an integer
    if (match && params.pokedexId) {
      loadQuery({ pokedexId: +params.pokedexId });
    }
  }, [loadQuery, params?.pokedexId, match]);

  if (!match) {
    return <div>Not found</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {queryRef && <PokemonDetail queryRef={queryRef} />}
    </Suspense>
  );
}
