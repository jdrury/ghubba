import { Link } from "wouter";
import { graphql, loadQuery, PreloadedQuery, usePreloadedQuery } from "react-relay";

import { homeQuery, homeQuery$variables } from "__generated__/homeQuery.graphql";
import { environment } from "@/lib/relay/relay-environment.ts";

const query = graphql`
  query homeQuery($login: String!) {
    viewer {
      name
      login
    }
    user(login: $login) {
      repositories(first: 100) {
        edges {
          node {
            id
            stargazerCount
            viewerHasStarred
            name
            description
            visibility
          }
        }
      }
    }
  }
`;

export function loader(vars: homeQuery$variables) {
  return loadQuery<homeQuery>(environment, query, vars)
}

type Props = {
  queryRef: PreloadedQuery<homeQuery>;
};

export function Home({ queryRef }: Props) {
  const data = usePreloadedQuery<homeQuery>(query, queryRef);

  const repositories = data.user?.repositories.edges?.map((edge) => edge?.node);

  console.log("GAAD!!");

  return (
    <main>
      <h1 className="text-4xl font-extrabold">Home</h1>
      <div className="border-2 border-black px-2 py-5">
        {data.viewer.name}, welcome to gHubba
      </div>
      <ul>
        {repositories?.map((repo) => (
          <li key={repo?.id}>
            <Link to={`/${data.viewer.login}/${repo?.name}`}>
              {repo?.name} ({repo?.visibility})
            </Link>
          </li>
        ))}
      </ul>
      <footer>
        <form action="/api/logout" method="POST">
          <button type="submit">Logout</button>
        </form>
      </footer>
    </main>
  );
}
