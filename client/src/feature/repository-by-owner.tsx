import { Link } from "react-router";

import { graphql, usePaginationFragment } from "react-relay";
import {
  repositoryByOwnerFragment$key,
  repositoryByOwnerFragment$data,
} from "__generated__/repositoryByOwnerFragment.graphql.ts";

const fragment = graphql`
  fragment repositoryByOwnerFragment on RepositoryOwner
  @refetchable(queryName: "repositoryByOwnerRefetchQuery")
  @argumentDefinitions(
    after: { type: String }
    first: { type: Int, defaultValue: 10 }
  ) {
    repositories(after: $after, first: $first)
      @connection(key: "RepositoryByOwner_repositories") {
      edges {
        node {
          id
          name
          description
          owner {
            login
          }
        }
      }
    }
  }
`;

// Extract a type from graphql file for our guard ("repo is Repository")
type Repository = NonNullable<
  NonNullable<
    NonNullable<repositoryByOwnerFragment$data["repositories"]["edges"]>[number]
  >["node"]
>;

type Props = {
  fragmentRef: repositoryByOwnerFragment$key;
};

function RepositoryByOwner({ fragmentRef }: Props) {
  const { data, hasNext, isLoadingNext, loadNext } = usePaginationFragment(
    fragment,
    fragmentRef,
  );

  const repositories = data.repositories.edges
    ?.map((edge) => edge?.node)
    .filter((repo): repo is Repository => Boolean(repo));

  if (repositories == null) {
    return (
      <section>
        <h2>Repositories</h2>
        <p>No repositories found.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Repositories</h2>
      <ul>
        {repositories.map((repo) => (
          <li key={repo?.id}>
            <Link
              className="text-blue-500"
              to={`/${repo?.owner.login}/${repo?.name}`}
            >
              {repo?.name}
            </Link>
            <small>{repo?.description}</small>
          </li>
        ))}
        <button
          className="border-dashed border-indigo-500 border px-4 py-1"
          onClick={() => loadNext(10)}
          disabled={!hasNext || isLoadingNext}
        >
          {isLoadingNext ? "Loading..." : "Load more"}
        </button>
      </ul>
    </section>
  );
}

export { RepositoryByOwner };
