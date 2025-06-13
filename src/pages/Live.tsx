import { Box, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../utils/context";

export default function Live() {
  const { appContent } = useContext(AppContext);
  return (
    <Stack
      direction={"column"}
      gap={"2rem"}
      width={"100%"}
      margin={"2rem 0rem"}
      p={"1rem"}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"1rem"}
        maxWidth={"800px"}
      >
        <Typography variant="h6" color="primary">
          {appContent.live_camera.title}
        </Typography>
        <Typography
          variant="body2"
          whiteSpace={"pre-line"}
          color="secondary"
          fontSize={"0.9rem"}
          fontFamily={"Source Code Pro"}
        >
          {appContent.live_camera.body}
        </Typography>
      </Box>
      <Box width={"100%"} sx={{ aspectRatio: "4/3" }} maxWidth={"800px"}>
        <iframe
          id="yotei-webcam"
          src="https://yotei.htmniseko.com/"
          width={"100%"}
          height={"100%"}
        ></iframe>
      </Box>
    </Stack>
  );
}
