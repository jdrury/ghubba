import { Suspense } from "react";
import { Outlet } from "react-router";

function AppLayout() {
  return (
    <main>
      <nav className="h-14 px-2 flex justify-between bg-blue-400 items-center">
        <h1>ghubba</h1>
        <form action="/api/logout" method="POST">
          <button type="submit">Logout</button>
        </form>
      </nav>
      <Suspense fallback={<p>loading...</p>}>
        <Outlet />
      </Suspense>
    </main>
  );
}

export { AppLayout };
