import * as deepl from "deepl-node";
import dotenv from "dotenv";

dotenv.config();

const authKey = process.env.DEEPL_AUTH_KEY;
const translator = new deepl.Translator(authKey);

export default async function useTranslate(text, sourceLang, targetLang) {
  const target_lang = targetLang === "en" ? "en-US" : "ja";
  const source_lang = sourceLang === "en" ? "en-US" : "ja";
  try {
    const result = await translator.translateText(
      text,
      source_lang,
      target_lang,
      {
        tagHandling: "html",
      }
    );
    return result.text;
  } catch (err) {
    console.log(err);
  }
}
