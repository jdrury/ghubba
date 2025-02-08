import { loadQuery, VariablesOf } from "react-relay";
import { ConcreteRequest, OperationType } from "relay-runtime";

import { environment } from "@/lib/relay/environment.ts";

export function fetchQuery<
  TRequest extends ConcreteRequest,
  TQuery extends OperationType,
>(query: TRequest, variables: VariablesOf<TQuery>) {
  return loadQuery<TQuery>(environment, query, variables)
}
