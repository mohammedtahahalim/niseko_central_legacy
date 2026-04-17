import { Box, styled } from "@mui/material";
import Filters from "../components/Home/Filters";
import Bookings from "../components/Home/Bookings";

const BookingContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  padding: "1rem",
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
  },
}));

export default function Home() {
  return (
    <BookingContainer>
      <Filters />
      <Bookings />
    </BookingContainer>
  );
}
