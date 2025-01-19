import { graphql, PreloadedQuery, usePreloadedQuery } from "react-relay";
import homeQueryGraphql, { homeQuery } from "__generated__/HomeQuery.graphql";
import { Link } from "wouter";

graphql`
  query homeQuery {
    getAllPokemon(offset: 0, take: 151) {
      num
      species
    }
  }
`;

type Props = {
  queryRef: PreloadedQuery<homeQuery>;
};

export function Home({ queryRef }: Props) {
  const data = usePreloadedQuery<homeQuery>(homeQueryGraphql, queryRef);

  console.log(data.getAllPokemon);
  return (
    <main>
      <h1>Home</h1>
      <ul>
        {data.getAllPokemon.map((pokemon) => (
          <li key={pokemon.num}>
            <Link to={`/pokemon/${pokemon.num}`}>
              #{pokemon.num}: {pokemon.species}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
