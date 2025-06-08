import { Stack } from "@mui/material";
import Filters from "../components/Home/Filters";
import Bookings from "../components/Home/Bookings";

export default function Home() {
  return (
    <Stack
      direction={{ md: "row", xs: "column" }}
      display={"flex"}
      width={"100%"}
      gap={"10px"}
      margin={"1.5rem 0rem"}
    >
      <Filters />
      <Bookings />
    </Stack>
  );
}
