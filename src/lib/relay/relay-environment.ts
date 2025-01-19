import { Store, RecordSource, Environment, Network } from "relay-runtime";

import { fetchGraphql } from "./fetch-graphql";

export function createEnvironment() {
  const network = Network.create(fetchGraphql); // TODO fetch wrapper with caching, custom header support, abortable
  const store = new Store(RecordSource.create(), {
    queryCacheExpirationTime: 15 * 60 * 1000, // expire cached query after 15 minutes
  });

  return new Environment({ network, store });
}

export const relayEnvironment = createEnvironment();
