import { createNodeMiddleware } from "octokit";
import { app } from "./app.ts";
import { config } from "./config.ts";

const middleware = createNodeMiddleware(app);

Deno.serve({ port: config.port },async (req) => {
  if (req.method === "POST") {
    try {
      const response = await middleware(req);
      return new Response(response.body, {
        status: response.status,
        headers: response.headers,
              });
    } catch (error) {
      console.error(error);
      return new Response("Error processing webhook", { status: 500 });
    }
  }
  return new Response("GitHub App is running!");
})

console.log(`Server running on port ${config.port}`);
