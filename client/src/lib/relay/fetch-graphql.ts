import type {
  GraphQLResponse,
  RequestParameters,
  Variables,
} from "relay-runtime";

export async function fetchGraphql(
  params: RequestParameters,
  variables: Variables,
): Promise<GraphQLResponse> {

  const resp = await fetch("/api/graphql", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });
  const json = await resp.json();

  // GraphQL returns exceptions (for example, a missing required variable) in the "errors"
  // property of the response. If any exceptions occurred when processing the request,
  // throw an error to indicate to the developer what went wrong.
  if (Array.isArray(json.errors)) {
    console.error(json.errors);
    throw new Error(
      `Error fetching GraphQL query '${
        params.name
      }' with variables '${JSON.stringify(variables)}': ${JSON.stringify(json.errors)}`,
    );
  }

  return json;
}
