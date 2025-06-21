import { useEffect, useState } from "react";

export default function useTopK(k: number) {
  const [topKBlogs, setTopKBlogs] = useState<Record<string, string>[]>([]);
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
