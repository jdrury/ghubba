import { RelayProvider } from "@/lib/relay/relay-provider";
import { Router } from "@/core/router.tsx";

export function App() {
  return (
    <RelayProvider>
      <Router />
    </RelayProvider>
  );
}
