import { useEffect, useState } from "react";
import type { bookingDetails } from "../utils/types";

interface IUseFetch {
  contents: bookingDetails[];
  error: string;
  loading: boolean;
  filteredContent: bookingDetails[];
  setFilteredContent: React.Dispatch<React.SetStateAction<bookingDetails[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function useFetch(): IUseFetch {
  const [contents, setContents] = useState<bookingDetails[]>([]);
  const [filteredContent, setFilteredContent] = useState<bookingDetails[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const url =
    (import.meta.env.VITE_API_URL || "http://localhost:3000") +
    `/api/getBookings`;

  useEffect(() => {
    (async () => {
      const controller = new AbortController();
      setLoading(true);
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          console.log(
            "Error fetching data from backend with a status error of : ",
            response.status
          );
          return;
        }
        const data = await response.json();
        setContents(
          data.bookings.map((element: any) => {
            return {
              ...element,
              images: JSON.parse(element.images),
              amenities: JSON.parse(element.amenities),
              jp_amenities: JSON.parse(element.jp_amenities),
            };
          })
        );
      } catch (err) {
        setError(err as string);
      } finally {
        setLoading(false);
      }
      return () => {
        controller.abort();
      };
    })();
  }, []);

  useEffect(() => {
    setContents({ ...contents });
  }, [contents]);

  return {
    contents,
    error,
    loading,
    filteredContent,
    setFilteredContent,
    setLoading,
  };
}
