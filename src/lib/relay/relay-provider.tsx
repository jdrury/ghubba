import type { PropsWithChildren } from "react";
import { RelayEnvironmentProvider } from "react-relay";

import { createEnvironment } from "./relay-environment.ts";

const relayEnvironment = createEnvironment();

export function RelayProvider({ children }: PropsWithChildren) {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      {children}
    </RelayEnvironmentProvider>
  );
}
