import { Box, CircularProgress, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import BookingCard from "../Bookings/BookingCard";
import useIntersectObserver from "../../hooks/useIntersectObserver";
import { motion } from "framer-motion";
import Sorters from "./Sorters";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookings,
  selectDisplayData,
  selectStatus,
} from "../../store/slices/bookingsSlice";
import type { AppDisptach } from "../../store/store";

const BookingWrapper = styled(Box)({
  flex: 1,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  overflow: "hidden",
});

const Loader = styled(Box)({
  width: "100%",
  minHeight: "150px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export default function Bookings() {
  const lastElemRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<AppDisptach>();
  const displayData = useSelector(selectDisplayData);
  const [currentActive, SetCurrentActive] = useState<number>(-1);
  const status = useSelector(selectStatus);

  useEffect(() => {
    const bookingRequest = dispatch(fetchBookings());
    return () => {
      bookingRequest.abort();
    };
  }, [dispatch]);

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

  return (
    <BookingWrapper>
      <Sorters />
      {status === "loading" && (
        <Loader>
          <CircularProgress color="secondary" />{" "}
        </Loader>
      )}
      {displayData.slice(0, numToShow || 5).map((element, idx: number) => {
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
              SetCurrentActive={SetCurrentActive}
              currentActive={currentActive}
            />
          </motion.div>
        );
      })}
      <div ref={lastElemRef} style={{ height: "75px" }}></div>
    </BookingWrapper>
  );
}
