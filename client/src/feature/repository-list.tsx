import { Link } from "react-router";
import { graphql, usePaginationFragment } from "react-relay";

import {
  repositoryListFragment$data,
  repositoryListFragment$key,
} from "__generated__/repositoryListFragment.graphql.ts";

const fragment = graphql`
  fragment repositoryListFragment on RepositoryOwner
  @refetchable(queryName: "repositoryListRefetchQuery")
  @argumentDefinitions(
    after: { type: String }
    first: { type: Int, defaultValue: 10 }
  ) {
    repositories(after: $after, first: $first)
      @connection(key: "RepositoryList_repositories") {
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
    NonNullable<repositoryListFragment$data["repositories"]["edges"]>[number]
  >["node"]
>;

type Props = {
  fragmentRef: repositoryListFragment$key;
};

function RepositoryList({ fragmentRef }: Props) {
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
            <Link to={`/${repo?.owner}/${repo?.name}`}>{repo?.name}</Link>
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

export { RepositoryList };
