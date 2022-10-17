import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
import { assertEquals } from "https://deno.land/std@0.159.0/testing/asserts.ts";
import ExtractFunction from "./extract.ts";

const { createContext } = SlackFunctionTester("extract");

Deno.test("Extract function test", async () => {
  let inputs = { body: "<@honyaku> ja_en This is a pen." };
  let result = await ExtractFunction(createContext({ inputs }));
  assertEquals(
    result.outputs?.command,
    "ja_en",
  );
  assertEquals(
    result.outputs?.body,
    "This is a pen.",
  );

  inputs = { body: "<@honyaku> engb_ptpt This is a pen." };
  result = await ExtractFunction(createContext({ inputs }));

  assertEquals(
    result.outputs?.command,
    "engb_ptpt",
  );
  assertEquals(
    result.outputs?.body,
    "This is a pen.",
  );

  inputs = { body: "<@honyaku> set_api_key XXXXXXXXXXXX" };
  result = await ExtractFunction(createContext({ inputs }));

  assertEquals(
    result.outputs?.command,
    "set_api_key",
  );
  assertEquals(
    result.outputs?.body,
    "XXXXXXXXXXXX",
  );
});
