import { graphql, PreloadedQuery, usePreloadedQuery } from "react-relay";
import homeQueryGraphql, { homeQuery } from "__generated__/HomeQuery.graphql";
import { Link } from "wouter";

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

  return (
    <main>
      <h1 className="text-4xl font-extrabold">Home</h1>
      <div className="border-2 border-black px-2 py-5">
        {data.viewer.name}, welcome to gHubba
      </div>
      <footer>
        <Link to="/logout" className="text-blue-500">
          Logout
        </Link>
      </footer>
    </main>
  );
}
