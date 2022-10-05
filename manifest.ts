import { Manifest } from "deno-slack-sdk/mod.ts";
import { Datastore } from "./datastores/datastore.ts";
import HonyakuWorkflow from "./workflows/honyaku_workflow.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "honyaku",
  description: "Honyaku Bot",
  icon: "assets/icon.png",
  workflows: [HonyakuWorkflow],
  outgoingDomains: [],
  datastores: [Datastore],
  botScopes: [
    "app_mentions:read",
    "chat:write",
    "chat:write.public",
    "datastore:read",
    "datastore:write",
  ],
});
