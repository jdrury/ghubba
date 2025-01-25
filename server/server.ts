import { serve } from "./deps.ts";
import { createNodeMiddleware } from "./deps.ts";
import { app } from "./app.ts";
import { config } from "./config.ts";

const middleware = createNodeMiddleware(app);

serve(async (req) => {
  if (req.method === "POST") {
    try {
      // @ts-ignore: Deno Request vs Node Request type mismatch
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
}, { port: config.port });

console.log(`Server running on port ${config.port}`);
