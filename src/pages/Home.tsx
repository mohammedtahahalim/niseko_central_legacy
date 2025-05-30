import { Stack } from "@mui/material";
import SearchBookings from "../layouts/SearchBookings";
import BookingResults from "../layouts/BookingResults";

export default function Home() {
  return (
    <Stack
      direction={{ md: "row", xs: "column" }}
      display={"flex"}
      width={"100%"}
    >
      <SearchBookings />
      <BookingResults />
    </Stack>
  );
}
