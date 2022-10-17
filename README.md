# Honyaku Bot

This is a bot to translate texts with DeepL for
[new Slack Pkatform](https://api.slack.com/future).

![スクリーンショット 2022-10-05 14 03 47](https://user-images.githubusercontent.com/1421093/193985753-0ba49d00-4b70-4ce7-a1d5-ae6530e6f53b.png)

# Commands

## Set API_KEY command

It's required to register API_KEY of DeepL beforehand.

* Set a key for each channel.
* [DeepL api_key page](https://www.deepl.com/ja/pro-api?cta=menu-pro-api/)

```text
...
	-H 'Authorization: DeepL-Auth-Key abcdedab-abcd-1234-aaaa-abcdef123456:xx' \
...
```

key is `abcdedab-abcd-1234-aaaa-abcdef123456:xx`  
(* The colon and the two letters behind it are also keys.)

```
@honyaku set_api_key XXXXXX-XXXXXX-XXXXXXXXXX-XXXXXX:XX
```

## Translation command

```
@honyaku <SOURCE_LANG>_<TARGET_LANG> <texts that you want to translate>
```

The available languages is noted in the following list of `source_lang` and
`target_lang` options.

- [https://www.deepl.com/ja/docs-api/translate-text/](https://www.deepl.com/ja/docs-api/translate-text/)

### Example

#### JA to EN

```
@honyaku ja_en これはペンです。
> Result: This is a pen.
```

#### EN to JA

```
@honyaku en_ja This is an apple.
> Result: これはりんごです。
```

# USAGE

## Running

```
$ slack run
```

## Testing

```
$ deno test
```

## Setting a trigger

```
$ slack trigger create --trigger-def "triggers/mention.ts"
```

## Deploying

```
$ slack deploy
```

# Author

[Yuhei Nakasaka](https://github.com/YuheiNakasaka)

# License

MIT
