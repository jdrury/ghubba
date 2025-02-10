import { Suspense } from "react";
import { Outlet } from "react-router";
import { ErrorBoundary } from "react-error-boundary";

import { Login } from "@/feature/auth/login";
import { UserSearch } from "@/feature/home/user-search.tsx";

function AppLayout() {
  return (
    <>
      <nav className="h-14 px-2 flex justify-between bg-blue-400 items-center">
        <h1>ghubba</h1>
        <UserSearch />
        <form action="/api/logout" method="POST">
          <button type="submit">Logout</button>
        </form>
      </nav>
      <main>
        <ErrorBoundary fallback={<Login />}>
          <Suspense fallback={<p>loading...</p>}>
            <section className="grid grid-cols-3 gap-8 mt-6 px-2">
              <Outlet />
            </section>
          </Suspense>
        </ErrorBoundary>
      </main>
    </>
  );
}

export { AppLayout };
