import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const ExtractFunction = DefineFunction({
  callback_id: "extract",
  title: "Extract",
  description: "Extracts text from a message",
  source_file: "functions/extract.ts",
  input_parameters: {
    properties: {
      body: {
        type: Schema.types.string,
      },
    },
    required: ["body"],
  },
  output_parameters: {
    properties: {
      command: {
        type: Schema.types.string,
      },
      body: {
        type: Schema.types.string,
      },
    },
    required: [],
  },
});

// Example:
// @honyaku run これはペンです。
// @honyaku set_api_key XXXXXXXXXXX
export default SlackFunction(ExtractFunction, ({ inputs }) => {
  const regExp = /\<\@.+?\>\s?(set_api_key|[a-z]{2,4}_[a-z]{2,4})\s?(.+)$/;
  const { body } = inputs;
  const m = body.match(regExp);
  if (m) {
    const command = m[1];
    const body = m[2];
    return {
      outputs: {
        command,
        body,
      },
    };
  }
  return {
    outputs: {},
  };
});
