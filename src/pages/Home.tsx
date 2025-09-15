import {
  Box,
  CircularProgress,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Filters from "../components/Home/Filters";
import Bookings from "../components/Home/Bookings";
import { useContext } from "react";
import { AppContext } from "../utils/context";

const BookingContainer = styled(Stack)(({ theme }) => ({
  width: "100%",
  gap: "10px",
  margin: "1.5rem 0rem",
  display: "flex",
  flexDirection: "row",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

export default function Home() {
  const { loading, filteredContent, appContent } = useContext(AppContext);
  return (
    <BookingContainer>
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
      ) : filteredContent.length === 0 ? (
        <Typography
          variant="h6"
          color="primary"
          width={"100%"}
          textAlign={"center"}
          marginTop={"1rem"}
        >
          {appContent.no_bookings_error}
        </Typography>
      ) : (
        <Bookings />
      )}
    </BookingContainer>
  );
}
