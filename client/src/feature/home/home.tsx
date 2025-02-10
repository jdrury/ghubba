import {
  graphql,
  loadQuery,
  PreloadedQuery,
  usePreloadedQuery,
} from "react-relay";
import { LoaderFunctionArgs, Outlet, useLoaderData } from "react-router";

import { environment } from "@/lib/relay/environment.ts";
import { RepositoryList } from "@/feature/repository-list.tsx";

import { homeQuery } from "__generated__/homeQuery.graphql";

const query = graphql`
  query homeQuery {
    viewer {
      name
      login
      avatarUrl
      ...repositoryListFragment
    }
  }
`;

function loader(args: LoaderFunctionArgs) {
  console.log(args);
  return loadQuery<homeQuery>(environment, query, {});
}

function Home() {
  const queryRef = useLoaderData<PreloadedQuery<homeQuery>>();
  const data = usePreloadedQuery<homeQuery>(query, queryRef);

  return (
    <section className="px-2 mt-6">
      <header>
        <h2 className="text-4xl font-extrabold">Home</h2>
      </header>
      <section className="flex gap-8 mt-6">
        <section>
          <div className="border-2 border-black px-2 py-5">
            <img src={data.viewer.avatarUrl} />
            <p>
              <strong>@{data.viewer.login}</strong> | {data.viewer.name}
            </p>
          </div>
        </section>
        <RepositoryList fragmentRef={data.viewer} />
        <Outlet />
      </section>
    </section>
  );
}

export { Home, loader };
