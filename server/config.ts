import { load } from "./deps.ts";

const env = await load();

export const config = {
  appId: env.APP_ID || Deno.env.get("APP_ID"),
  privateKey: env.PRIVATE_KEY || Deno.env.get("PRIVATE_KEY"),
  webhookSecret: env.WEBHOOK_SECRET || Deno.env.get("WEBHOOK_SECRET"),
  port: parseInt(env.PORT || Deno.env.get("PORT") || "8000"),
};
