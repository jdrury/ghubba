import { createNodeMiddleware } from "octokit";
import { app } from "./app.ts";
import { config } from "./config.ts";

const middleware = createNodeMiddleware(app);

Deno.serve({ port: config.port }, (req) => {
  const url = new URL(req.url);

  // Webhook handler
  if (url.pathname === "/api/webhook" && req.method === "POST") {
    return middleware(req);
  }

  // OAuth callback handler
  if (url.pathname === "/api/auth/callback/github") {
    return handleCallback(req);
  }

  return new Response("GitHub App is running!");
})

async function handleCallback(req: Request) {
  const payload = await req.json()
  console.log(payload)
  return
  // Handle OAuth token exchange
  // const accessToken = await exchangeCodeForToken(code);

  // Redirect to frontend with token
  // return new Response(null, {
  //   status: 302,
  //   headers: {
  //     Location: `http://localhost:5173?token=${accessToken}`
  //   }
  // });
}

console.log(`Server running on port ${config.port}`);
