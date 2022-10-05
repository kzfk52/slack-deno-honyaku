import {
  DefineDatastore,
  Schema,
} from "https://deno.land/x/deno_slack_sdk@1.1.2/mod.ts";

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
