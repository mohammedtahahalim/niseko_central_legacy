import { useCallback, useEffect, useRef, useState } from "react";
import type { bookingDetails } from "../utils/types";

interface IUseFetch {
  contents: bookingDetails[];
  error: string;
  loading: boolean;
  filteredContent: bookingDetails[];
  setFilteredContent: React.Dispatch<React.SetStateAction<bookingDetails[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UseFetchProps {
  baseAPI?: string;
  endpoint?: string;
  options?: RequestInit;
}

export default function useFetch({
  baseAPI = import.meta.env.VITE_API_URL,
  endpoint = "getBookings",
  options = {},
}: UseFetchProps = {}): IUseFetch {
  const [contents, setContents] = useState<bookingDetails[]>([]);
  const [filteredContent, setFilteredContent] = useState<bookingDetails[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const controllerRef = useRef<AbortController | null>(null);

  const fetchBookings = useCallback(async () => {
    if (controllerRef.current) controllerRef.current.abort();
    controllerRef.current = new AbortController();

    setLoading(true);
    setError("");
    // This is a workaround because for some reason react batch all updates resulting in loading not changing to true before data is received
    await new Promise((resolve) => setTimeout(resolve, 0));
    try {
      const url = `${baseAPI}/api/${endpoint}`;
      const fullOptions: RequestInit = {
        method: "GET",
        signal: controllerRef.current.signal,
        ...options,
      };
      const response = await fetch(url, fullOptions);
      if (!response.ok) throw new Error(response.status.toString());
      const data = await response.json();
      const formattedData = data.bookings.map((element: any) => {
        return {
          ...element,
          images: JSON.parse(element.images),
          amenities: JSON.parse(element.amenities),
          jp_amenities: JSON.parse(element.jp_amenities),
        };
      });
      setContents(formattedData);
      setFilteredContent(formattedData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        return;
      }
      if (err instanceof DOMException && err.name === "AbortError") {
        console.warn("Request Aborted ...");
        return;
      }
      console.error("Unknown Server Error");
    } finally {
      setLoading(false);
    }
  }, [baseAPI, endpoint, options]);

  useEffect(() => {
    fetchBookings();
    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, []);

  return {
    contents,
    error,
    loading,
    filteredContent,
    setFilteredContent,
    setLoading,
  };
}
