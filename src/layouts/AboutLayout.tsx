import { Box, Stack, styled, Typography } from "@mui/material";
import { useContext } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { AppContext } from "../utils/context";

const StyledBox = styled(Box)({
  width: "100%",
  height: "250px",
  position: "relative",
});

const Background = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: "url('/niseko_central_staff.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "blur(1.1px)",
  zIndex: 1,
});
const Overlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  zIndex: 2,
});

const StyledTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "danger",
})({
  zIndex: "3",
  position: "relative",
  alignSelf: "flex-end",
});

const AboutNavLinks = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  textTransform: "capitalize",
  fontFamily: "Source Code Pro",
  fontSize: "1.1rem",
  color: theme.palette.primary.main,
  fontWeight: "600",
}));

export default function AboutLayout() {
  const { appContent } = useContext(AppContext);
  type SectionKey = keyof typeof appContent.about.sections;
  const currentPath = useLocation().pathname;
  const actualPath = currentPath.replace(/[/_.-]/, "");

  return (
    <Stack direction={"column"} width={"100%"}>
      <StyledBox>
        <Background />
        <Overlay />
        <Box position={"absolute"} bottom={"25px"} left={"25px"}>
          <StyledTypography variant="h6">
            {appContent.about.sections[actualPath as SectionKey].title}
          </StyledTypography>
          <StyledTypography variant="h5" sx={{ color: "white" }}>
            {appContent.about.sections[actualPath as SectionKey].subtitle}
          </StyledTypography>
        </Box>
      </StyledBox>
      <Stack
        direction={{ md: "row", xs: "column-reverse" }}
        gap={"10px"}
        justifyContent={"space-between"}
        width={"100%"}
        marginTop={"2rem"}
      >
        <Stack
          direction={"column"}
          p={"2rem 1rem"}
          gap={"10px"}
          width={"250px"}
        >
          {appContent.about.about_nav_links.map((aboutLink) => {
            return (
              <AboutNavLinks
                to={aboutLink[1]}
                key={
                  appContent.about.sections[aboutLink[0] as SectionKey].navlink
                }
              >
                {appContent.about.sections[aboutLink[0] as SectionKey].navlink}
              </AboutNavLinks>
            );
          })}
        </Stack>
        <Box flex={"1"} px={{ md: "0", xs: "1rem" }}>
          <Outlet />
        </Box>
      </Stack>
    </Stack>
  );
}
