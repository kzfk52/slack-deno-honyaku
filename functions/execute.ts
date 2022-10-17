import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import { SlackAPI } from "deno-slack-api/mod.ts";
import { Datastore, DATASTORE_NAME } from "../datastores/datastore.ts";

export const ExecuteFunction = DefineFunction({
  callback_id: "execute",
  title: "Execute",
  source_file: "functions/execute.ts",
  input_parameters: {
    properties: {
      command: {
        type: Schema.types.string,
      },
      body: {
        type: Schema.types.string,
      },
      channelId: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ["command", "body", "channelId"],
  },
  output_parameters: {
    properties: {
      result: {
        type: Schema.types.string,
      },
    },
    required: [],
  },
});

export default SlackFunction(ExecuteFunction, async ({ inputs, token }) => {
  if (!inputs.command || !inputs.body || !inputs.channelId) {
    return { outputs: {} };
  }

  const client = SlackAPI(token, {});
  const command = inputs.command;
  const body = inputs.body;
  let result = "Command not found";

  if (command === "set_api_key") {
    const response = await client.apps.datastore.put({
      datastore: DATASTORE_NAME,
      item: {
        id: inputs.channelId,
        apiKey: body,
      },
    });
    result = "Success";
    if (!response.ok) {
      result = "Failed to set API key";
    }
  } else if (command === "clear_api_key") {
    const response = await client.apps.datastore.delete({
      datastore: DATASTORE_NAME,
      item: {
        id: inputs.channelId,
      },
    });
    result = "Success";
    if (!response.ok) {
      result = "Failed to delete API key";
    }
  } else if (command === "help") {
    result =
      "source_lang:\nBG - Bulgarian\nCS - Czech\nDA - Danish\nDE - German\nEL - Greek\nEN - English\nES - Spanish\nET - Estonian\nFI - Finnish\nFR - French\nHU - Hungarian\nID - Indonesian\nIT - Italian\nJA - Japanese\nLT - Lithuanian\nLV - Latvian\nNL - Dutch\nPL - Polish\nPT - Portuguese (all Portuguese varieties mixed)\nRO - Romanian\nRU - Russian\nSK - Slovak\nSL - Slovenian\nSV - Swedish\nTR - Turkish\nUK - Ukrainian\nZH - Chinese\n\ntarget_lang:\nBG - Bulgarian\nCS - Czech\nDA - Danish\nDE - German\nEL - Greek\nEN - English (unspecified variant for backward compatibility; please select EN-GB or EN-US instead)\nEN-GB - English (British)\nEN-US - English (American)\nES - Spanish\nET - Estonian\nFI - Finnish\nFR - French\nHU - Hungarian\nID - Indonesian\nIT - Italian\nJA - Japanese\nLT - Lithuanian\nLV - Latvian\nNL - Dutch\nPL - Polish\nPT - Portuguese (unspecified variant for backward compatibility; please select PT-BR or PT-PT instead)\nPT-BR - Portuguese (Brazilian)\nPT-PT - Portuguese (all Portuguese varieties excluding Brazilian Portuguese)\nRO - Romanian\nRU - Russian\nSK - Slovak\nSL - Slovenian\nSV - Swedish\nTR - Turkish\nUK - Ukrainian\nZH - Chinese (simplified)\n";
  } else if (command.match(/[a-z]{2,4}_[a-z]{2,4}/)) {
    const queryResult = await client.apps.datastore.query<
      typeof Datastore.definition
    >({
      datastore: DATASTORE_NAME,
      expression: `#id = :channelId`,
      expression_attributes: {
        "#id": "id",
      },
      expression_values: { ":channelId": inputs.channelId },
    });

    if (queryResult.ok) {
      if (queryResult.items && queryResult.items.length > 0) {
        const apiKey = queryResult.items[0].apiKey;
        const langs = command.split("_");
        result = await translateText(apiKey, body, langs[0], langs[1]);
      } else {
        result = "Set API Key first.";
      }
    } else {
      result = "Failed to get API key";
    }
  }

  return { outputs: { result } };
});

const translateText = async (
  apiKey: string,
  text: string,
  sourceLang: string,
  targetLang: string,
) => {
  const url = `https://api-free.deepl.com/v2/translate`;
  const params = new URLSearchParams();
  params.append("auth_key", apiKey);
  params.append("text", text);
  params.append("source_lang", sourceLang.toUpperCase());
  params.append("target_lang", targetLang.toUpperCase());
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });
  const json = await response.json();
  if (json.translations && json.translations.length > 0) {
    return json.translations[0].text;
  }
  return `Translation Error - ${sourceLang} -> ${targetLang}`;
};
