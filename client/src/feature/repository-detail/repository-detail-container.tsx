import { useParams } from "wouter";
import { useQueryLoader } from "react-relay";
import { Suspense, useEffect } from "react";

import { RepositoryDetail } from "./repository-detail.tsx";

import repositoryDetailQueryNode, { repositoryDetailQuery } from "__generated__/repositoryDetailQuery.graphql.ts";

export function RepositoryDetailContainer() {
  const params = useParams()
  const [queryRef, loadQuery] = useQueryLoader<repositoryDetailQuery>(repositoryDetailQueryNode);

  useEffect(() => {
    loadQuery({
      login: params.login ?? "",
      repository: params.repository ?? "",
    });
  }, [loadQuery, params]);

  return (
    <Suspense fallback={"Loading..."}>
      {queryRef != null && <RepositoryDetail queryRef={queryRef} />}
    </Suspense>
  );
}
