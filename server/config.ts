import { load } from "std/dotenv/mod.ts";

const env = await load();

enum ENVIRONMENTS {
  LOCAL = "local",
  PRODUCTION = "production",
}

const config = {
  appId: env.APP_ID || Deno.env.get("APP_ID"),
  clientId: env.CLIENT_ID || Deno.env.get("CLIENT_ID"),
  clientSecret: env.CLIENT_SECRET || Deno.env.get("CLIENT_SECRET"),
  webhookSecret: env.WEBHOOK_SECRET || Deno.env.get("WEBHOOK_SECRET"),
  port: parseInt(env.PORT || Deno.env.get("PORT") || "8000"),
  environment: env.ENVIRONMENT ?? ENVIRONMENTS.PRODUCTION,
};

export { config, ENVIRONMENTS };
