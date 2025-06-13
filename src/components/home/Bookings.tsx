import { Box, CircularProgress } from "@mui/material";
import useIntersectObserver from "../../hooks/useIntersectObserver";
import { lazy, Suspense, useRef } from "react";
const BookingCard = lazy(() => import("../Bookings/BookingCard"));

export default function Bookings() {
  const lastElemRef = useRef<HTMLDivElement | null>(null);
  const { numToShow } = useIntersectObserver({
    currRef: lastElemRef,
    min: 3,
    max: 12,
    increment: 5,
  });
  return (
    <Box
      sx={{ width: { md: "65%", xs: "90%" } }}
      display={"flex"}
      flexDirection={"column"}
      gap={"10px"}
      alignSelf={"center"}
    >
      <Suspense fallback={<CircularProgress sx={{ alignSelf: "center" }} />}>
        {Array.from({ length: numToShow }).map((_, idx) => {
          return <BookingCard key={idx} />;
        })}
      </Suspense>
      <div ref={lastElemRef} style={{ height: "1px" }}></div>
    </Box>
  );
}
