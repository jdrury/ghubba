import { Link } from "react-router";
import { graphql, useFragment } from "react-relay";

import { repositoryListFragment$key } from "__generated__/repositoryListFragment.graphql.ts";

const fragment = graphql`
  fragment repositoryListFragment on RepositoryConnection {
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
`;

type Props = {
  fragmentRef: repositoryListFragment$key;
};

function RepositoryList({ fragmentRef }: Props) {
  const data = useFragment(fragment, fragmentRef);
  const repositories = data.edges?.map((edge) => edge?.node);
  return (
    <section>
      {repositories?.map((repo) => (
        <li key={repo?.id}>
          <Link
            className="text-blue-500"
            to={`/${repo?.owner.login}/${repo?.name}`}
          >
            {repo?.name}
          </Link>
          <small>{repo?.description ?? "<no description>"}</small>
        </li>
      ))}
    </section>
  );
}

export { RepositoryList };
