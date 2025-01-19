import { graphql, useFragment } from "react-relay";
import { pokemonCryFragment$key } from "__generated__/pokemonCryFragment.graphql";

const fragment = graphql`
  fragment pokemonCryFragment on Pokemon {
    cry
  }
`;

type Props = {
  fragmentRef: pokemonCryFragment$key;
};

export function PokemonCry({ fragmentRef }: Props) {
  const data = useFragment(fragment, fragmentRef);

  return (
    <audio controls>
      <source src={data.cry ?? undefined} type="audio/mpeg" />
    </audio>
  );
}
