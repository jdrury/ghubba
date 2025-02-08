import { createFileRoute } from "@tanstack/react-router";
import { Home, loader } from "@/feature/home/home";
import { Suspense } from "react";

export const Route = createFileRoute("/")({
  loader: () => loader({login: "jdrury"}),
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
