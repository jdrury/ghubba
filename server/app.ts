import { config } from "./config.ts";
import { App } from "octokit";


export const app = new App({
  appId: config.appId,
  privateKey: config.privateKey,
  // webhooks: {
  //   secret: config.webhookSecret,
  // },
});

// Setup webhook handlers
app.webhooks.on("issues.opened", async ({ octokit, payload }) => {
  await octokit.rest.issues.createComment({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    issue_number: payload.issue.number,
    body: "Thanks for opening this issue!",
  });
});
