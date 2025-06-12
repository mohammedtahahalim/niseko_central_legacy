import { Box, Stack, Typography, styled, Button } from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../utils/context";
import Accomodation from "../components/Contact/Accomodation";
import General from "../components/Contact/General";

interface StyledButtonProps {
  activePositions: boolean;
}

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "danger" && prop !== "activePositions",
})<StyledButtonProps>(({ theme, activePositions }) => ({
  fontFamily: "Source Code Pro",
  border: activePositions ? `1px solid ${theme.palette.divider}` : "none",
  borderBottom: `none`,
  borderTopLeftRadius: "6px",
  borderTopRightRadius: "6px",
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
  height: "1px",
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down("md")]: {
    transform: "translateY(-50%)",
    height: "4px",
  },
}));

export default function Contact() {
  const { appContent } = useContext(AppContext);
  const [activeForm, setActiveForm] = useState<"accomodation" | "general">(
    "accomodation"
  );
  return (
    <Stack direction={"column"} width={"100%"} p={"2rem"} gap={"2rem"}>
      <Stack direction={"column"} gap={{ md: "5px", xs: "15px" }}>
        <Typography variant="h6" color="primary">
          {appContent.contact.enquire}
        </Typography>
        <Box display={"flex"} flexDirection={"column"} gap={"2px"}>
          {appContent.contact.contact_info.map((element) => {
            return (
              <Box
                key={element[0]}
                display={"flex"}
                gap={"2px"}
                alignItems={"flex-start"}
              >
                <strong style={{ textWrap: "nowrap" }}>{element[0]} :</strong>{" "}
                <Typography variant="subtitle1" color="secondary">
                  {element[1]}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Stack>
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
              activePositions={activeForm === "accomodation"}
              onClick={() => setActiveForm("accomodation")}
            >
              {appContent.contact.types.accomodation}
            </StyledButton>
            {activeForm === "accomodation" && <OverlayBox></OverlayBox>}
          </Box>
          <Box position={"relative"}>
            <StyledButton
              variant="text"
              color="secondary"
              size="large"
              activePositions={activeForm === "general"}
              onClick={() => setActiveForm("general")}
            >
              {appContent.contact.types.general}
            </StyledButton>
            {activeForm === "general" && <OverlayBox></OverlayBox>}
          </Box>
        </StyledStack>
        <Box width={"100%"} p={"1rem"}>
          {activeForm === "accomodation" && <Accomodation />}
          {activeForm === "general" && <General />}
        </Box>
      </Box>
    </Stack>
  );
}
