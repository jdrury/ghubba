import type { PropsWithChildren } from "react";
import { RelayEnvironmentProvider } from "react-relay";

import { environment } from "./environment";

function RelayProvider({ children }: PropsWithChildren) {
  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  );
}

export { RelayProvider };
