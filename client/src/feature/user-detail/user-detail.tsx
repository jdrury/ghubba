import {
  graphql,
  loadQuery,
  PreloadedQuery,
  usePreloadedQuery,
} from "react-relay";
import { LoaderFunctionArgs, Outlet, useLoaderData } from "react-router";

import { environment } from "@/lib/relay/environment";
import { RepositoryList } from "@/feature/repository-list";

import { userDetailQuery } from "__generated__/userDetailQuery.graphql";

const query = graphql`
  query userDetailQuery($login: String!) {
    user(login: $login) {
      name
      login
      avatarUrl
      ...repositoryListFragment
    }
  }
`;

function loadUser({ params }: LoaderFunctionArgs) {
  const vars = {
    login: params.login ?? "",
  };
  return loadQuery<userDetailQuery>(environment, query, vars);
}

function UserDetail() {
  const queryRef = useLoaderData<PreloadedQuery<userDetailQuery>>();
  const data = usePreloadedQuery<userDetailQuery>(query, queryRef);

  if (data.user == null) {
    return <h2>404: User not found</h2>;
  }

  return (
    <>
      <section>
        <div className="border-2 border-black px-2 py-5">
          <img
            src={data.user.avatarUrl}
            alt={`${data.user.name}'s profile picture`}
          />
          <p>
            <strong>@{data.user.login}</strong> | {data.user.name}
          </p>
        </div>
        <RepositoryList fragmentRef={data.user} />
      </section>
      <Outlet />
    </>
  );
}

export { UserDetail, loadUser };
