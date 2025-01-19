import type { ReactNode } from "react";
import { RelayEnvironmentProvider } from "react-relay";

import { relayEnvironment } from "./relay-environment";

type Props = {
  children: ReactNode;
};

export function RelayProvider({ children }: Props) {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      {children}
    </RelayEnvironmentProvider>
  );
}
