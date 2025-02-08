import { Store, RecordSource, Environment } from "relay-runtime";

import { network } from "./network.ts";

function createEnvironment() {
  const store = new Store(RecordSource.create(), {
    queryCacheExpirationTime: 15 * 60 * 1000, // expire cached query after 15 minutes
  });

  return new Environment({ network, store });
}

const environment = createEnvironment()

export { environment }
