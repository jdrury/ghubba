import { PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Login } from "@/feature/auth/login.tsx";
import { Provider } from "@/lib/relay/provider.tsx";

export function AppContext({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary fallback={<Login />}>
      <Provider>
        {children}
      </Provider>
    </ErrorBoundary>
  );
}
