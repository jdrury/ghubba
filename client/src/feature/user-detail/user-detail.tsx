import {
  graphql,
  loadQuery,
  PreloadedQuery,
  usePreloadedQuery,
} from "react-relay";
import { LoaderFunctionArgs, useLoaderData } from "react-router";

import { environment } from "@/lib/relay/environment";
import { RepositoryList } from "@/feature/repository-list.tsx";

import {
  userDetailQuery,
  userDetailQuery$data,
} from "__generated__/userDetailQuery.graphql";

const query = graphql`
  query userDetailQuery($login: String!) {
    user(login: $login) {
      name
      login
      avatarUrl
      topRepositories(
        first: 25
        orderBy: { direction: DESC, field: UPDATED_AT }
      ) {
        edges {
          node {
            ...repositoryListFragment
          }
        }
      }
    }
  }
`;

// Extract a type from graphql file for our guard ("repo is TopRepository")
type TopRepository = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<userDetailQuery$data["user"]>["topRepositories"]["edges"]
    >[number]
  >["node"]
>;

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

  const topRepositories = data.user.topRepositories.edges
    ?.map((edge) => edge?.node)
    .filter((repo): repo is TopRepository => Boolean(repo));

  return (
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
      {topRepositories != null && (
        <RepositoryList fragmentRef={topRepositories} />
      )}
    </section>
  );
}

export { UserDetail, loadUser };
