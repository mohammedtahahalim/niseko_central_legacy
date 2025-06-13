import { Box, Stack, Typography } from "@mui/material";
import MuiBox from "./MuiBox";
import PersonIcon from "@mui/icons-material/Person";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";

export default function Suggestions() {
  return (
    <Stack
      direction={"column"}
      maxWidth={{ sm: "225px", xs: "90%" }}
      alignSelf={"center"}
    >
      <Box width={"100%"} sx={{ aspectRatio: "4/3" }}>
        <img src="/1.jpg" alt="" width={"100%"} height={"100%"} />
      </Box>
      <MuiBox variant="hybrid" sx={{ p: "0.5rem", gap: "10px" }}>
        <Typography variant="h6" color="secondary" fontSize={"0.95rem"}>
          3 Bedroom Penthouse
        </Typography>
        <Typography variant="body2" fontSize={"0.85rem"}>
          Yama Shizen
        </Typography>
      </MuiBox>
      <MuiBox variant="secondary">
        <Stack direction={"row"} width={"100%"}>
          <Box
            flex={"1"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            gap={"2px"}
            p={"5px"}
          >
            <PersonIcon color="info" />
            <Typography variant="body2" color="primary" fontSize={"0.75rem"}>
              7 Max Guests
            </Typography>
          </Box>
          <Box
            width={"1px"}
            height={"60%"}
            bgcolor={"#DBE3EA"}
            alignSelf={"center"}
          ></Box>
          <Box
            flex={"1"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            gap={"2px"}
            p={"5px"}
          >
            <DirectionsRunIcon color="info" />
            <Typography variant="body2" color="primary" fontSize={"0.75rem"}>
              7 Max Guests
            </Typography>
          </Box>
        </Stack>
      </MuiBox>
    </Stack>
  );
}
