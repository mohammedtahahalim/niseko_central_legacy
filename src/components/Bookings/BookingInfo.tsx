import { Box, Stack, Typography } from "@mui/material";

export default function BookingInfo() {
  return (
    <Stack
      width={{ md: "40%", xs: "100%" }}
      direction={"column"}
      gap={{ md: "10px", xs: "3px" }}
      p={"0.5rem 1rem"}
    >
      <Typography variant="h6" color="secondary">
        Youtei Tracks 301a
      </Typography>
      <Typography variant="subtitle2" fontWeight={"200"} color="secondary">
        Youtei Tracks
      </Typography>
      <Box display={"flex"} flexDirection={"column"} gap={"0px"}>
        <Typography variant="body2" fontWeight={"800"} color="secondary">
          1 Bedroom, 2 Beds
        </Typography>
        <Typography variant="body2" fontWeight={"800"} color="secondary">
          1 Bathroom, Full Kitchen
        </Typography>
      </Box>
      <Box display={"flex"} flexDirection={"column"} gap={"0px"}>
        <Typography variant="subtitle2" fontWeight={"200"} color="secondary">
          Floor size: 56 sqm
        </Typography>
        <Typography variant="subtitle2" fontWeight={"200"} color="secondary">
          Lifts within 600m
        </Typography>
        <Typography variant="subtitle2" fontWeight={"200"} color="secondary">
          Village Centre within 300m
        </Typography>
        <Typography variant="subtitle2" fontWeight={"200"} color="secondary">
          Mt Yotei View
        </Typography>
      </Box>
    </Stack>
  );
}
