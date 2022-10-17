import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { ExtractFunction } from "../functions/extract.ts";
import { ExecuteFunction } from "../functions/execute.ts";
import { SendFunction } from "../functions/send.ts";

export const HonyakuWorkflow = DefineWorkflow({
  callback_id: "honyaku",
  title: "Honyaku Workflow",
  input_parameters: {
    properties: {
      text: {
        type: Schema.types.string,
      },
      userId: {
        type: Schema.slack.types.user_id,
      },
      channelId: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ["text", "userId", "channelId"],
  },
});

const extractStep = HonyakuWorkflow.addStep(ExtractFunction, {
  body: HonyakuWorkflow.inputs.text,
});

const executeStep = HonyakuWorkflow.addStep(ExecuteFunction, {
  command: extractStep.outputs.command,
  body: extractStep.outputs.body,
  channelId: HonyakuWorkflow.inputs.channelId,
});

HonyakuWorkflow.addStep(SendFunction, {
  channelId: HonyakuWorkflow.inputs.channelId,
  text: executeStep.outputs.result,
});

export default HonyakuWorkflow;
