import { PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Login } from "@/feature/auth/login.tsx";
import { RelayProvider } from "@/lib/relay/relay-provider.tsx";

export function AppContext({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary fallback={<Login />}>
      <RelayProvider>
        {children}
      </RelayProvider>
    </ErrorBoundary>
  );
}
