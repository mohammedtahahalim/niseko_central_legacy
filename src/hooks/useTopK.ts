import { useCallback, useEffect, useRef, useState } from "react";
import type { IBlogs } from "../utils/types";

interface IUseTopK {
  loading: boolean;
  error: string;
  topKBlogs: IBlogs[];
  fetchTopKBlogs: () => Promise<void>;
}

interface UseBlogsProps {
  baseAPI?: string;
  endpoint?: string;
  options?: RequestInit;
  k: number;
}

export default function useTopK({
  baseAPI = import.meta.env.VITE_API_URL,
  endpoint = "mostViewedBlogs",
  options = {},
  k = 6,
}: UseBlogsProps): IUseTopK {
  const [topKBlogs, setTopKBlogs] = useState<IBlogs[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const controllerRef = useRef<AbortController | null>(null);

  const fetchTopKBlogs = useCallback(async () => {
    if (controllerRef.current) controllerRef.current.abort();
    controllerRef.current = new AbortController();

    setLoading(true);
    setError("");
    // This is a workaround because for some reason react batch all updates resulting in loading not changing to true before data is received
    await new Promise((resolve) => setTimeout(resolve, 0));
    try {
      const url: string = `${baseAPI}/api/${endpoint}?k=${k}`;
      const fullOptions: RequestInit = {
        method: "GET",
        signal: controllerRef.current.signal,
        credentials: "include",
        ...options,
      };
      const response = await fetch(url, fullOptions);
      if (!response.ok) throw new Error(response.status.toString());
      const data = await response.json();
      setTopKBlogs(data.articles);
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
  }, [baseAPI, endpoint, options, k]);

  useEffect(() => {
    fetchTopKBlogs();
    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, []);

  return { loading, topKBlogs, error, fetchTopKBlogs };
}
