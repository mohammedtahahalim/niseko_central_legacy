import { useEffect, useState } from "react";

export default function useFetch(id: number = 0) {
  const url = import.meta.env.API_URL + `?id=${id}`;
  const [contents, setContents] = useState([]);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const controller = new AbortController();
      setLoading(true);
      try {
        const response = await fetch(url, { signal: controller.signal });
        const data = await response.json();
        setContents(data);
      } catch (err) {
        console.log(err);
        setError(err as string);
      } finally {
        setLoading(false);
      }
      return () => {
        controller.abort();
      };
    })();
  }, []);

  return { contents, error, loading };
}
