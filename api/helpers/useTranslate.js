import * as deepl from "deepl-node";
import dotenv from "dotenv";

dotenv.config();

const authKey = process.env.DEEPL_AUTH_KEY;
const translator = new deepl.Translator(authKey);

export default async function useTranslate(text, lang) {
  try {
    const result = await translator.translateText(
      text,
      null,
      lang === "en" ? "ja" : "en-US",
      {
        tag_handling: "html",
        preserve_formatting: true,
      }
    );
    return result.text;
  } catch (err) {
    console.log(err);
    return "";
  }
}
