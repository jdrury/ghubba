import { Router } from "@/core/router.tsx";
import { RelayProvider } from "@/lib/relay/relay-provider.tsx";

export function App() {
  return (
    <RelayProvider>
      <Router />
    </RelayProvider>
  );
}
