import { useEffect, useState } from "react";
import type { bookingDetails } from "../utils/types";

export default function useFetch() {
  const url = import.meta.env.VITE_API_URL + `/api/getBookings`;

  const [contents, setContents] = useState<bookingDetails[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const controller = new AbortController();
      setLoading(true);
      try {
        const response = await fetch(url, { signal: controller.signal });
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

  return { contents, error, loading };
}
