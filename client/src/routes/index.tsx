import { Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Home } from "@/feature/home/home";
import { fetchQuery } from "@/lib/relay/fetch-query.ts";

import HomeQueryGraphql, { homeQuery } from "__generated__/homeQuery.graphql.ts";

export const Route = createFileRoute("/")({
  loader: () => fetchQuery<typeof HomeQueryGraphql, homeQuery>(HomeQueryGraphql, { login: "jdrury" }),
  component: HomeRoute,
})

function HomeRoute() {
  const queryRef = Route.useLoaderData()
  return (
    <Suspense fallback={"Loading..."}>
      {queryRef && <Home queryRef={queryRef} />}
    </Suspense>
  )
}
