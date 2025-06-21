import { Box, CircularProgress, Stack } from "@mui/material";
import Filters from "../components/Home/Filters";
import Bookings from "../components/Home/Bookings";
import { useContext } from "react";
import { AppContext } from "../utils/context";

export default function Home() {
  const { loading } = useContext(AppContext);
  return (
    <Stack
      direction={{ md: "row", xs: "column" }}
      display={"flex"}
      width={"100%"}
      gap={"10px"}
      margin={"1.5rem 0rem"}
    >
      <Filters />
      {loading ? (
        <Box width={"100%"} display={"flex"} justifyContent={"center"}>
          <CircularProgress
            color="secondary"
            sx={{
              marginTop: "5rem",
            }}
          />
        </Box>
      ) : (
        <Bookings />
      )}
    </Stack>
  );
}
