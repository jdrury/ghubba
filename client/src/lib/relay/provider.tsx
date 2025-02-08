import type { PropsWithChildren } from "react";
import { RelayEnvironmentProvider } from "react-relay";

import { environment } from "./environment.ts";

export function Provider({ children }: PropsWithChildren) {
  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  );
}
