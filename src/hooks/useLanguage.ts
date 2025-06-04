import { useEffect, useState, useMemo } from "react";
import defaultEn from "../utils/en.json";
import defaultJp from "../utils/jp.json";

const getInitialLanguage = (): "en" | "jp" => {
  const storedLanguage = localStorage.getItem("language") as "en" | "jp";
  return storedLanguage === "jp" ? "jp" : "en";
};

export default function useLanguage() {
  const [lang, setLang] = useState<"en" | "jp">(getInitialLanguage);

  const appContent = useMemo(() => {
    return lang === "jp" ? defaultJp : defaultEn;
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("language", lang);
    document.title = appContent.title;
  }, [lang, appContent]);

  return { setLang, appContent, lang };
}
