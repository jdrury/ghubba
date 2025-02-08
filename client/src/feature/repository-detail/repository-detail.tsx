import { graphql, PreloadedQuery, usePreloadedQuery } from "react-relay";

import { repositoryDetailQuery } from "__generated__/repositoryDetailQuery.graphql.ts";

const query = graphql`
  query repositoryDetailQuery($login: String!, $repository: String!) {
    repositoryOwner(login: $login) {
      repository(name: $repository) {
        id
        name
        description
        stargazerCount
        viewerHasStarred
        viewerPermission
      }
    }
  }
`;

type Props = {
  queryRef: PreloadedQuery<repositoryDetailQuery>;
};

export function RepositoryDetail({ queryRef }: Props) {
  const data = usePreloadedQuery<repositoryDetailQuery>(query, queryRef);
  const repo = data.repositoryOwner?.repository

  if (repo == null) {
    return (
      <h1>404 repo not found</h1>
    )
  }

  return (
    <section>
      <h1 className="text-4xl font-extrabold">{repo.name}</h1>
    </section>
  );
}
