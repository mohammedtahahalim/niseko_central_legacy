import { Box, Stack, Typography } from "@mui/material";
import MuiBox from "./MuiBox";
import PersonIcon from "@mui/icons-material/Person";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import { useContext, useState } from "react";
import { AppContext } from "../utils/context";

interface ISuggestions {
  type: string;
  category: string;
  maxPax: number;
  lifts: number;
  img: {
    url: string;
    blur: string;
  };
}

export default function Suggestions({
  type,
  category,
  maxPax,
  lifts,
  img,
}: ISuggestions) {
  const [loaded, setLoaded] = useState<boolean>(false);
  const { appContent } = useContext(AppContext);
  return (
    <Stack
      direction={"column"}
      maxWidth={{ sm: "300px", xs: "100%" }}
      alignSelf={"center"}
    >
      <Box
        width={"100%"}
        sx={{
          aspectRatio: "4/3",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            opacity: loaded ? 0 : 1,
            transition: "opacity 0.5s linear",
            display: "block",
          }}
          src={img.blur}
        />
        <img
          src={img.url}
          alt="Placeholder"
          width={"100%"}
          height={"100%"}
          onLoad={() => setLoaded(true)}
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s linear" }}
        />
      </Box>
      <MuiBox variant="hybrid" sx={{ p: "0.5rem", gap: "10px" }}>
        <Typography variant="h6" color="secondary" fontSize={"0.95rem"}>
          {type}
        </Typography>
        <Typography variant="body2" fontSize={"0.85rem"}>
          {category}
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
              {maxPax} {appContent.guests}
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
            <Typography
              variant="body2"
              color="primary"
              fontSize={"0.75rem"}
              textAlign={"center"}
            >
              {appContent.addBooking.lifts} {lifts}m
            </Typography>
          </Box>
        </Stack>
      </MuiBox>
    </Stack>
  );
}
