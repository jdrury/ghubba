import { useQueryLoader } from "react-relay";
import { Suspense, useEffect } from "react";
import { Home } from "@/feature/home/home.tsx";
import homeQueryNode, { homeQuery } from "__generated__/HomeQuery.graphql";

export function HomeContainer() {
  const [queryRef, loadQuery] = useQueryLoader<homeQuery>(homeQueryNode);

  useEffect(() => {
    loadQuery({
      login: "jdrury"
    });
  }, [loadQuery]);

  return (
    <Suspense fallback={"Loading..."}>
      {queryRef != null && <Home queryRef={queryRef} />}
    </Suspense>
  );
}
