import { graphql, PreloadedQuery, usePreloadedQuery } from "react-relay";
import homeQueryGraphql, { homeQuery } from "__generated__/HomeQuery.graphql";

graphql`
  query homeQuery {
    viewer {
      name
    }
  }
`;

type Props = {
  queryRef: PreloadedQuery<homeQuery>;
};

export function Home({ queryRef }: Props) {
  const data = usePreloadedQuery<homeQuery>(homeQueryGraphql, queryRef);

  console.log(data.viewer.name);
  return (
    <main>
      <h1>Home</h1>
      {data.viewer.name}, welcome to gHubba
    </main>
  );
}
