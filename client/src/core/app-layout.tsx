import { Outlet } from "react-router";

function AppLayout() {
  return (
    <main>
      <nav className="h-14 border-b">
      </nav>
      <Outlet />
    </main>
  )
}

export { AppLayout }
