import { useEffect, useState } from "react";

interface IArticleData {
  en_title: string;
  jp_title: string;
  bannerIMG: string;
  en_category: string;
  jp_category: string;
  date: string;
  en_content: string;
  jp_content: string;
}

export default function useArticle(title: string) {
  const [articleData, setArticleData] = useState<IArticleData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!title) {
      return;
    }
    (async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/api/getArticle/?title=${encodeURIComponent(title)}`
        );
        if (!response.ok) {
          return;
        }
        const data = await response.json();
        setArticleData(data.article[0] as IArticleData);
      } catch (err) {
        console.log("Failed Fatching Article : ", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [title]);

  return { articleData, loading };
}
