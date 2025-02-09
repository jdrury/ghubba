import {
  graphql,
  loadQuery,
  PreloadedQuery,
  usePreloadedQuery,
  VariablesOf,
} from "react-relay";
import { useLoaderData } from "react-router";

import { environment } from "@/lib/relay/environment.ts";

import { homeQuery } from "__generated__/homeQuery.graphql";

const query = graphql`
  query homeQuery {
    viewer {
      name
      login
      avatarUrl
      websiteUrl
    }
  }
`;

function loader(vars: VariablesOf<homeQuery>) {
  return loadQuery<homeQuery>(environment, query, vars);
}

function Home() {
  const queryRef = useLoaderData<PreloadedQuery<homeQuery>>();

  const data = usePreloadedQuery<homeQuery>(query, queryRef);

  console.log("GAAD!!");

  return (
    <main>
      <h1 className="text-4xl font-extrabold">Home</h1>
      <div className="border-2 border-black px-2 py-5">
        <img src={data.viewer.avatarUrl} />
        <p>
          <strong>@{data.viewer.login}</strong> | {data.viewer.name}
        </p>
      </div>
      {/*<ul>*/}
      {/*  {repositories?.map((repo) => (*/}
      {/*    <li key={repo?.id}>*/}
      {/*      <Link to={`/${data.viewer.login}/${repo?.name}`}>*/}
      {/*        {repo?.name} ({repo?.visibility})*/}
      {/*      </Link>*/}
      {/*    </li>*/}
      {/*  ))}*/}
      {/*</ul>*/}
      <footer>
        <form action="/api/logout" method="POST">
          <button type="submit">Logout</button>
        </form>
      </footer>
    </main>
  );
}

export { Home, loader };
