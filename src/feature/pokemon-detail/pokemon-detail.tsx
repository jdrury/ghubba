import { graphql, PreloadedQuery, usePreloadedQuery } from "react-relay"
import { PokemonCry } from "@/feature/pokemon-detail/pokemon-cry.tsx"
import { pokemonDetailQuery } from "__generated__/pokemonDetailQuery.graphql"

const query = graphql`
  query pokemonDetailQuery($pokedexId: Int!) {
    getPokemonByDexNumber(number: $pokedexId) {
      __typename
      ...pokemonCryFragment
      species
      sprite
    }
  }
`;

type Props = {
  queryRef: PreloadedQuery<pokemonDetailQuery>;
};

export function PokemonDetail({ queryRef }: Props) {
  const data = usePreloadedQuery(query, queryRef);
  return (
    <section>
      <img
        alt={data.getPokemonByDexNumber.species}
        src={data.getPokemonByDexNumber.sprite}
      />
      <PokemonCry fragmentRef={data.getPokemonByDexNumber} />
    </section>
  );
}
