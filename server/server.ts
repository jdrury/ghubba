import { createNodeMiddleware } from "octokit";
import { contentType  } from "@std/media-types";

import { app } from "./app.ts";
import { config } from "./config.ts";

const middleware = createNodeMiddleware(app);

Deno.serve({ port: config.port }, async (req) => {
  const url = new URL(req.url);

  if (url.pathname === "/api/login" && req.method === "POST") {
    return new Response(null, {
      status: 302,
      headers: {
        Location: `https://github.com/login/oauth/authorize?client_id=${config.clientId}`,
      }
    })
  }

  if (url.pathname === "/api/logout" && req.method === "POST") {
    return new Response(null, {
      status: 302,
      headers: {
        "Set-Cookie": `gh_token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`,
        "Location": "/"
      },
    });
  }

  if (url.pathname === "/api/graphql" && req.method === "POST") {
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
      },
    });
  }

  // Webhook handler
  if (url.pathname === "/api/webhook" && req.method === "POST") {
    return middleware(req);
  }

  // OAuth callback handler
  // api/auth/callback/github
  if (url.pathname === "/api/auth/callback/github") {
    return handleAuthCallback(req);
  }

  if (url.pathname.startsWith('/assets')) {

    return new Response(await Deno.readFile('.' + url.pathname), {
      status: 200,
      headers: {
        "content-type":contentType(url.pathname.split('.')[1]) || "application/octet-stream", 
      },
    })

  }


  return new Response(await Deno.readFile("./index.html"), {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  })
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

  // Github returns 200 OK even if request fails... (>.<)
  if (data.error) {
    console.error('Request for access token has failed!')
    // TODO how to respond?
  }

  console.log(resp.status)
  console.log(resp.statusText)
  console.log(data)
  return new Response(null, {
    status: 302,
    headers: {
      "Set-Cookie":
      `gh_token=${data.access_token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${
60 * 60 * 24
}`,
      "Location": "http://localhost:8000",
    },
  });
}

console.log(`Server running on port ${config.port}`);
