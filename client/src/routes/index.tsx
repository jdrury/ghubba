import { Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Home, loader } from "@/feature/home/home";

export const Route = createFileRoute("/")({
  loader: () => loader({}),
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
