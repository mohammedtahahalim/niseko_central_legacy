import { Box } from "@mui/material";
import { useContext, useRef } from "react";
import BookingCard from "../Bookings/BookingCard";
import { AppContext } from "../../utils/context";
import useIntersectObserver from "../../hooks/useIntersectObserver";

export default function Bookings() {
  const { contents } = useContext(AppContext);
  const lastElemRef = useRef<HTMLDivElement | null>(null);
  const { numToShow } = useIntersectObserver({
    currRef: lastElemRef,
    min: 3,
    max: contents.length,
    increment: 2,
  });

  return (
    <Box
      sx={{ width: { md: "65%", xs: "90%" } }}
      display={"flex"}
      flexDirection={"column"}
      gap={"10px"}
      alignSelf={"center"}
    >
      {contents.slice(0, numToShow).map((element, idx) => {
        return <BookingCard key={idx} bookingDetail={element} />;
      })}
      <div ref={lastElemRef} style={{ height: "10px" }}></div>
    </Box>
  );
}
