import { Box, CircularProgress } from "@mui/material";
import useIntersectObserver from "../../hooks/useIntersectObserver";
import { useEffect, useRef, useState } from "react";
import BookingCard from "../Bookings/BookingCard";
import type { bookingDetails } from "../../utils/types";

export default function Bookings() {
  const lastElemRef = useRef<HTMLDivElement | null>(null);
  const [bookingData, setBookingData] = useState<bookingDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { numToShow } = useIntersectObserver({
    currRef: lastElemRef,
    min: 3,
    max: 12,
    increment: 5,
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/getBookings`
        );
        if (!response.ok) {
          return;
        }
        const data = await response.json();
        console.log(data);
        setBookingData(
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
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Box
      sx={{ width: { md: "65%", xs: "90%" } }}
      display={"flex"}
      flexDirection={"column"}
      gap={"10px"}
      alignSelf={"center"}
    >
      {loading ? (
        <CircularProgress sx={{ alignSelf: "center" }} />
      ) : (
        bookingData.slice(0, numToShow).map((element, idx) => {
          return <BookingCard key={idx} bookingDetail={element} />;
        })
      )}
      <div ref={lastElemRef} style={{ height: "1px" }}></div>
    </Box>
  );
}
