import { Box } from "@mui/material";
import { useCallback, useContext, useRef, useState } from "react";
import BookingCard from "../Bookings/BookingCard";
import { AppContext } from "../../utils/context";
import useIntersectObserver from "../../hooks/useIntersectObserver";
import { motion } from "framer-motion";

export default function Bookings() {
  const { filteredContent } = useContext(AppContext);
  const lastElemRef = useRef<HTMLDivElement | null>(null);
  const [currentlyActive, setCurrentlyActive] = useState<boolean[]>(
    Array.from({ length: filteredContent.length }, () => false)
  );

  const { numToShow } = useIntersectObserver({
    currRef: lastElemRef,
    min: 3,
    max: filteredContent.length,
    increment: 3,
  });

  const initial = (denom: number) => {
    return window.innerWidth > 600
      ? { opacity: 0, x: `${denom}px` }
      : { opacity: 0, y: "75px" };
  };
  const animate =
    window.innerWidth > 600 ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 };

  const handleSeeMoreLogic = useCallback(
    (idx: number) => {
      setCurrentlyActive(
        currentlyActive.map((element, odx) => {
          if (odx === idx) {
            return !element;
          }
          return false;
        })
      );
    },
    [currentlyActive, setCurrentlyActive]
  );

  return (
    <Box
      sx={{ width: { md: "65%", xs: "90%" } }}
      display={"flex"}
      flexDirection={"column"}
      gap={"10px"}
      alignSelf={"center"}
    >
      {filteredContent.slice(0, numToShow).map((element, idx) => {
        return (
          <motion.div
            initial={initial(50 + (idx % 3) * 50)}
            animate={animate}
            transition={{ type: "tween", duration: 0.75, ease: "easeInOut" }}
            key={idx}
          >
            <BookingCard
              bookingDetail={element}
              setShowMore={() => handleSeeMoreLogic(idx)}
              isShownMore={currentlyActive[idx]}
            />
          </motion.div>
        );
      })}
      <div ref={lastElemRef} style={{ height: "75px" }}></div>
    </Box>
  );
}
