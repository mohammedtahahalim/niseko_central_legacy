import { useEffect, useState } from "react";
import type { TAppContent } from "../utils/types";
import defaultEn from "../utils/en.json";
import defaultJp from "../utils/jp.json";

export default function useLanguage() {
  const [lang, setLang] = useState<"en" | "jp">(
    (localStorage.getItem("language") as "en" | "jp") || "en"
  );
  const [appContent, setAppContent] = useState<TAppContent>(
    localStorage.getItem("language") === "jp" ? defaultJp : defaultEn
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      localStorage.setItem("language", lang);
      const content = await import(`../utils/${lang}.json`);
      setAppContent(content);
      document.title = content.title;
      setLoading(false);
    })();
  }, [lang]);

  return { setLang, appContent, loading };
}
