import { useEffect, useState } from "react";

interface IBlogs {
  en_title: string;
  banner_img: {
    image: string;
    blur: string;
  };
  en_category: string;
  date: string;
  en_content: string;
  jp_title: string;
  jp_category: string;
  jp_content: string;
  count: string;
}

export default function useTopK(k: number) {
  const [topKBlogs, setTopKBlogs] = useState<IBlogs[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/mostViewedBlogs?k=${k}`
        );
        const data = await response.json();
        setTopKBlogs(data.articles);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { loading, topKBlogs };
}
