import { Suspense } from "react";
import { Outlet } from "react-router";

function AppLayout() {
  return (
    <main>
      <nav className="h-14 border-b bg-red-300"></nav>
      <Suspense fallback={<p> loading...</p>}>
        <Outlet />
      </Suspense>
    </main>
  );
}

export { AppLayout };
