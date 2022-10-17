import { DefineDatastore, Schema } from "deno-slack-sdk/mod.ts";
export const DATASTORE_NAME = "honyaku";

export const Datastore = DefineDatastore({
  name: DATASTORE_NAME,
  primary_key: "id",
  attributes: {
    id: {
      type: Schema.slack.types.channel_id,
    },
    apiKey: {
      type: Schema.types.string,
    },
  },
});
