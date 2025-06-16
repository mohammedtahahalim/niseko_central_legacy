import { Box, Skeleton } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../utils/context";

export default function BookingImage() {
  const { loading } = useContext(AppContext);

  return (
    <Box
      width={{ md: "35%", xs: "100%" }}
      height={"100%"}
      maxHeight={"230px"}
      p={{ xs: "0.5rem 0.5rem", md: "0.5rem" }}
      display={"flex"}
      flexDirection={"column"}
    >
      <Box
        width={{ md: "100%", sm: "50%", xs: "100%" }}
        overflow={"hidden"}
        alignSelf={"center"}
        sx={{ aspectRatio: "1" }}
      >
        {loading ? (
          <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
        ) : (
          <img
            src={`${Math.floor(Math.random() * 7 + 1)}.jpg`}
            alt=""
            width={"100%"}
            height={"100%"}
            style={{ borderRadius: "12px" }}
          />
        )}
      </Box>
    </Box>
  );
}
