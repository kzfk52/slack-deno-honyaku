import {
  DefineFunction,
  Schema,
  SlackFunction,
} from "https://deno.land/x/deno_slack_sdk@1.1.2/mod.ts";
import { SlackAPI } from "deno-slack-api/mod.ts";

export const SendFunction = DefineFunction({
  callback_id: "send",
  title: "Send",
  description: "Send a message",
  source_file: "functions/send.ts",
  input_parameters: {
    properties: {
      channelId: {
        type: Schema.slack.types.channel_id,
      },
      text: {
        type: Schema.types.string,
      },
    },
    required: ["channelId", "text"],
  },
});

export default SlackFunction(SendFunction, ({ inputs, token }) => {
  const { channelId, text } = inputs;
  const client = SlackAPI(token, {});
  client.chat.postMessage({
    channel: channelId,
    text: `Result: ${text}`,
  });
  return {
    outputs: {},
  };
});
