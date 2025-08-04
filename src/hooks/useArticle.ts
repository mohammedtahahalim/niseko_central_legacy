import { useCallback, useEffect, useRef, useState } from "react";
import { articleTitleSchema } from "../utils/schema";
import type { IArticleData } from "../utils/types";

interface IUseArticle {
  articleData: IArticleData | null;
  loading: boolean;
  error: string;
}

export default function useArticle(
  title: string,
  baseAPI: string = import.meta.env.VITE_API_URL,
  options: RequestInit = {}
): IUseArticle {
  const [articleData, setArticleData] = useState<IArticleData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const controllerRef = useRef<AbortController | null>(null);

  const fetchArticle = useCallback(async (): Promise<void> => {
    if (controllerRef.current) controllerRef.current.abort();
    controllerRef.current = new AbortController();

    setLoading(true);
    setError("");
    // This is a workaround because for some reason react batch all updates resulting in loading not changing to true before data is received
    await new Promise((resolve) => setTimeout(resolve, 0));
    try {
      const validTitle = articleTitleSchema.safeParse(title);
      if (!validTitle) {
        setError("schema");
      }
      const url: string = `${baseAPI}/api/getArticle/?title=${encodeURIComponent(
        title
      )}`;
      const fullOptions: RequestInit = {
        method: "GET",
        signal: controllerRef.current.signal,
        ...options,
      };
      const response = await fetch(url, fullOptions);
      if (!response.ok) throw new Error(response.status.toString());
      const data = await response.json();
      setArticleData(data.article);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        return;
      }
      if (err instanceof DOMException && err.name === "AbortError") {
        console.warn("Request Aborted");
        return;
      }
      console.error("Unknown Error: ", err);
    } finally {
      setLoading(false);
    }
  }, [title, baseAPI, options]);

  useEffect(() => {
    fetchArticle();
    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, []);

  return { articleData, loading, error };
}
