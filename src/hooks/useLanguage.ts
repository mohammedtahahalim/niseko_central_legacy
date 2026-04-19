import { useEffect, useState, useMemo } from "react";
import defaultEn from "../utils/en.json";
import defaultJp from "../utils/jp.json";
import type { TAppContent } from "../utils/types";

interface IUseLanguage {
  lang: "en" | "jp";
  appContent: TAppContent;
  setLang: React.Dispatch<React.SetStateAction<"en" | "jp">>;
}

const getInitialLanguage = (): "en" | "jp" => {
  try {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage === "jp" || storedLanguage === "en")
      return storedLanguage;
    const browserLanguage = navigator.language;
    if (browserLanguage === "jp" || browserLanguage === "en")
      return browserLanguage;
    return "en";
  } catch (err) {
    console.log(
      "Error fetching language from local storage defaulting back to english",
      err,
    );
    return "en";
  }
};

export default function useLanguage(): IUseLanguage {
  const [lang, setLang] = useState<"en" | "jp">(getInitialLanguage);

  const appContent = useMemo(() => {
    return lang === "jp" ? defaultJp : defaultEn;
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("language", lang);
  }, [lang]);

  useEffect(() => {
    document.title = appContent.title;
  }, [appContent]);

  return { setLang, appContent, lang };
}
