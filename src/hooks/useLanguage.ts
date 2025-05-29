import { useEffect, useState } from "react";

export default function useLanguage() {
  const [lang, setLang] = useState<"en" | "jp">(
    (localStorage.getItem("language") as "en" | "jp") || "en"
  );
  const [appContent, setAppContent] = useState({});
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
