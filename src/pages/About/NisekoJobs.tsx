import { Box, Button, Stack, styled, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../../utils/context";
import Seasonal from "../../components/Jobs/Seasonal";
import Yearly from "../../components/Jobs/Yearly";

interface StyledButtonProps {
  activePositions: boolean;
}

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "danger" && prop !== "activePositions",
})<StyledButtonProps>(({ theme, activePositions }) => ({
  fontFamily: "Source Code Pro",
  border: activePositions ? `1px solid ${theme.palette.divider}` : "none",
  borderBottom: `none`,
  borderRadius: "0px",
  padding: "0.7rem 1rem",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const StyledStack = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "danger",
})(({ theme }) => ({
  paddingLeft: "20px",
  [theme.breakpoints.down("md")]: {
    borderBottom: `none`,
  },
  [theme.breakpoints.up("md")]: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const OverlayBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: "0",
  width: "100%",
  height: "2px",
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down("md")]: {
    transform: "translateY(-50%)",
    height: "4px",
  },
}));

export default function NisekoJobs() {
  const { appContent } = useContext(AppContext);
  const [activePositions, setActivePositions] = useState<"season" | "year">(
    "season"
  );
  return (
    <Box
      gap={"10px"}
      display={"flex"}
      flexDirection={"column"}
      p={{ md: "2rem 3rem", xs: "2rem 1rem" }}
    >
      <Typography variant="h6" color="primary">
        {appContent.about.jobs.title}
      </Typography>
      <Typography variant="body1">
        {appContent.about.jobs.description}
      </Typography>
      <Box display={"flex"} flexDirection={"column"}>
        <StyledStack
          direction={{ md: "row", xs: "column" }}
          gap={{ md: "1rem", xs: "5px" }}
        >
          <Box position={"relative"}>
            <StyledButton
              variant="text"
              color="secondary"
              size="large"
              activePositions={activePositions === "season"}
              onClick={() => setActivePositions("season")}
            >
              {appContent.about.jobs.currentJobs.seasonal}
            </StyledButton>
            {activePositions === "season" && <OverlayBox></OverlayBox>}
          </Box>
          <Box position={"relative"}>
            <StyledButton
              variant="text"
              color="secondary"
              size="large"
              activePositions={activePositions === "year"}
              onClick={() => setActivePositions("year")}
            >
              {appContent.about.jobs.currentJobs.yearly}
            </StyledButton>
            {activePositions === "year" && <OverlayBox></OverlayBox>}
          </Box>
        </StyledStack>
        <Box width={"100%"} p={"1rem"}>
          {activePositions === "season" && <Seasonal />}
          {activePositions === "year" && <Yearly />}
        </Box>
      </Box>
    </Box>
  );
}
