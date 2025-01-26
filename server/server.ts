import { createNodeMiddleware } from "octokit";

import { app } from "./app.ts";
import { config } from "./config.ts";

const middleware = createNodeMiddleware(app);

Deno.serve({ port: config.port }, async (req) => {
  const url = new URL(req.url);

  // CORS preflight
  // TODO DEV support only
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:5173",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Credentials": "true",
      },
    });
  }

  if (url.pathname === "/logout" && req.method === "POST") {
    return new Response(null, {
      headers: {
        "Set-Cookie": `gh_token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`,
        "Access-Control-Allow-Origin": "http://localhost:5173",
        "Access-Control-Allow-Credentials": "true",
      },
    });
  }

  if (url.pathname === "/graphql" && req.method === "POST") {
    const cookies = req.headers.get("cookie");
    const token = cookies?.match(/gh_token=([^;]+)/)?.[1];

    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const resp = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return new Response(await resp.text(), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5173",
        "Access-Control-Allow-Credentials": "true",
      },
    });
  }

  // Webhook handler
  if (url.pathname === "/api/webhook" && req.method === "POST") {
    return middleware(req);
  }

  // OAuth callback handler
  if (url.pathname === "/api/auth/callback/github") {
    return handleAuthCallback(req);
  }

  return new Response("Deno is running! 🦕");
});

async function handleAuthCallback(req: Request) {
  const url = new URL(req.url);
  const params = new URLSearchParams(url.search);

  const resp = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "client_id": config.clientId,
      "client_secret": config.clientSecret,
      "code": params.get("code"),
    }),
  });

  const data = await resp.json();

  return new Response(null, {
    status: 302,
    headers: {
      "Set-Cookie":
        `gh_token=${data.access_token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${
          60 * 60 * 24
        }`,
      "Location": "http://localhost:5173",
    },
  });
}

console.log(`Server running on port ${config.port}`);
