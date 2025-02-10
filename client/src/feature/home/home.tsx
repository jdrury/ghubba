import {
  graphql,
  loadQuery,
  PreloadedQuery,
  usePreloadedQuery,
} from "react-relay";
import { LoaderFunctionArgs, Outlet, useLoaderData } from "react-router";

import { environment } from "@/lib/relay/environment";
import { RepositoryList } from "@/feature/repository-list";

import { homeQuery } from "__generated__/homeQuery.graphql";

const query = graphql`
  query homeQuery($login: String!) {
    user(login: $login) {
      name
      login
      avatarUrl
      ...repositoryListFragment
    }
  }
`;

function loader({ params }: LoaderFunctionArgs) {
  const vars = {
    login: params.login,
  };
  return loadQuery<homeQuery>(environment, query, vars);
}

function Home() {
  const queryRef = useLoaderData<PreloadedQuery<homeQuery>>();
  const data = usePreloadedQuery<homeQuery>(query, queryRef);

  if (data.user == null) {
    return <h2>404: User not found</h2>;
  }

  return (
    <section className="px-2 mt-6">
      <header>
        <h2 className="text-4xl font-extrabold">Home</h2>
      </header>
      <section className="flex gap-8 mt-6">
        <section>
          <div className="border-2 border-black px-2 py-5">
            <img src={data.user.avatarUrl} />
            <p>
              <strong>@{data.user.login}</strong> | {data.user.name}
            </p>
          </div>
        </section>
        <RepositoryList fragmentRef={data.user} />
        <Outlet />
      </section>
    </section>
  );
}

export { Home, loader };
