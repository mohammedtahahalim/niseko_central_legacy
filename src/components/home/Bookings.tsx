import { Box } from "@mui/material";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import BookingCard from "../Bookings/BookingCard";
import { AppContext } from "../../utils/context";
import useIntersectObserver from "../../hooks/useIntersectObserver";
import { motion } from "framer-motion";
import Sorters from "./Sorters";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../../store/slices/bookingsSlice";
import type { AppDisptach } from "../../store/store";

export default function Bookings() {
  const { filteredContent } = useContext(AppContext);
  const lastElemRef = useRef<HTMLDivElement | null>(null);
  const [currentlyActive, setCurrentlyActive] = useState<boolean[]>(
    Array.from({ length: filteredContent.length }, () => false)
  );
  const dispatch = useDispatch<AppDisptach>();
  const { displayData } = useSelector((state: any) => state.bookings);

  useEffect(() => {
    dispatch(fetchBookings({ endpoint: "getBookings" }));
  }, []);

  const { numToShow } = useIntersectObserver({
    currRef: lastElemRef,
    min: 3,
    max: displayData?.length,
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
      <Sorters />
      {displayData &&
        displayData
          .slice(0, numToShow || 5)
          .map((element: any, idx: number) => {
            return (
              <motion.div
                initial={initial(75 + (idx % 3) * 75)}
                animate={animate}
                transition={{
                  type: "tween",
                  duration: 0.75,
                  ease: "easeInOut",
                }}
                key={element.id}
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
