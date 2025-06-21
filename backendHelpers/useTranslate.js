import * as deepl from "deepl-node";
import dotenv from "dotenv";

dotenv.config();

const authKey = process.env.DEEPL_AUTH_KEY;
const translator = new deepl.Translator(authKey);

export default async function useTranslate(text, sourceLang, targetLang) {
  try {
    const result = await translator.translateText(
      text,
      sourceLang,
      targetLang,
      {
        tagHandling: "html",
      }
    );
    return sourceLang === "en"
      ? result.text.split(", ")
      : result.text.split("、");
  } catch (err) {
    console.log(err);
    return "";
  }
}
