import type { PropsWithChildren } from "react";
import { RelayEnvironmentProvider } from "react-relay";

import { environment } from "./relay-environment.ts";

export function RelayProvider({ children }: PropsWithChildren) {
  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  );
}
