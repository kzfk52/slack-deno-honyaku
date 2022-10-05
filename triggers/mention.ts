import { Trigger } from "deno-slack-api/types.ts";
import { HonyakuWorkflow } from "../workflows/honyaku_workflow.ts";
import { CHANNEL_IDS } from "../env.ts";

const trigger: Trigger<typeof HonyakuWorkflow.definition> = {
  type: "event",
  event: {
    event_type: "slack#/events/app_mentioned",
    channel_ids: CHANNEL_IDS,
  },
  name: "Mention trigger",
  workflow: "#/workflows/honyaku",
  inputs: {
    "text": {
      value: "{{data.text}}",
    },
    "userId": {
      value: "{{data.user_id}}",
    },
    "channelId": {
      value: "{{data.channel_id}}",
    },
  },
};

export default trigger;
