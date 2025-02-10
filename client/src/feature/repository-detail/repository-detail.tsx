import {
  graphql,
  loadQuery,
  PreloadedQuery,
  usePreloadedQuery,
} from "react-relay";
import { LoaderFunctionArgs, useLoaderData } from "react-router";

import { environment } from "@/lib/relay/environment.ts";

import { repositoryDetailQuery } from "__generated__/repositoryDetailQuery.graphql";

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
        createdAt
        collaborators {
          edges {
            node {
              login
            }
          }
        }
      }
    }
  }
`;

function loadRepository({ params }: LoaderFunctionArgs) {
  const vars = {
    login: params.login ?? "",
    repository: params.repository ?? "",
  };
  return loadQuery<repositoryDetailQuery>(environment, query, vars);
}

function RepositoryDetail() {
  const queryRef = useLoaderData<PreloadedQuery<repositoryDetailQuery>>();
  const data = usePreloadedQuery<repositoryDetailQuery>(query, queryRef);
  const repo = data.repositoryOwner?.repository;

  if (repo == null) {
    return <h1>404 repo not found</h1>;
  }

  return (
    <section>
      <h1 className="text-4xl font-extrabold">{repo.name}</h1>
      <ul>
        <li>Description: {repo.description ?? "n/a"}</li>
        <li>Starred by Viewer: {repo.viewerHasStarred ? "Y" : "N"}</li>
        <li>Number of Stars: {repo.stargazerCount ?? "n/a"}</li>
        <li>Created: {repo.createdAt}</li>
        <li>
          Collaborators:{" "}
          {repo.collaborators?.edges
            ?.map((edge) => edge?.node)
            .map((collab) => collab?.login)
            .join(", ")}
        </li>
      </ul>
    </section>
  );
}

export { RepositoryDetail, loadRepository };
