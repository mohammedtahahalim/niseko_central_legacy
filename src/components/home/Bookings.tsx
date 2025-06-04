import { Box } from "@mui/material";
import BookingCard from "../Bookings/BookingCard";

export default function Bookings() {
  return (
    <Box
      sx={{ width: { md: "65%", xs: "90%" } }}
      display={"flex"}
      flexDirection={"column"}
      gap={"10px"}
      alignSelf={"center"}
    >
      <BookingCard />
      <BookingCard />
      <BookingCard />
      <BookingCard />
      <BookingCard />
    </Box>
  );
}
