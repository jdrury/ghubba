import { Router } from "@/core/router.tsx";
import { RelayProvider } from "@/lib/relay/relay-provider.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { Login } from "@/feature/auth/login.tsx";

export function App() {
  return (
    <ErrorBoundary fallback={<Login />}>
      <RelayProvider>
        <Router />
      </RelayProvider>
    </ErrorBoundary>
  );
}
