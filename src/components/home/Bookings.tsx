import { Box } from "@mui/material";
import { useContext, useRef } from "react";
import BookingCard from "../Bookings/BookingCard";
import { AppContext } from "../../utils/context";
import useIntersectObserver from "../../hooks/useIntersectObserver";
import { motion } from "framer-motion";

export default function Bookings() {
  const { contents } = useContext(AppContext);
  const lastElemRef = useRef<HTMLDivElement | null>(null);

  const { numToShow } = useIntersectObserver({
    currRef: lastElemRef,
    min: 3,
    max: contents.length,
    increment: 3,
  });

  const initial = (denom: number) => {
    return window.innerWidth > 600
      ? { opacity: 0, x: `${denom}px` }
      : { opacity: 0, y: "75px" };
  };
  const animate =
    window.innerWidth > 600 ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 };
  return (
    <Box
      sx={{ width: { md: "65%", xs: "90%" } }}
      display={"flex"}
      flexDirection={"column"}
      gap={"10px"}
      alignSelf={"center"}
    >
      {contents.slice(0, numToShow).map((element, idx) => {
        return (
          <motion.div
            initial={initial(50 + (idx % 3) * 50)}
            animate={animate}
            transition={{ type: "tween", duration: 0.75, ease: "easeInOut" }}
            key={idx}
          >
            <BookingCard bookingDetail={element} />
          </motion.div>
        );
      })}
      <div ref={lastElemRef} style={{ height: "75px" }}></div>
    </Box>
  );
}
