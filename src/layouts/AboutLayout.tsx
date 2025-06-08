import { Box, Stack, styled, Container } from "@mui/material";
import { useContext, Suspense } from "react";
import Loading from "../components/Loading";
import Header from "./Header";
import Footer from "./Footer";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { AppContext } from "../utils/context";
import Banner from "../components/Banner";

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
    <Stack direction={"column"} sx={{ height: "100%", minHeight: "100vh" }}>
      <Header />
      <Suspense fallback={<Loading />}>
        <Stack direction={"column"} width={"100%"}>
          <Banner
            title={appContent.about.sections[actualPath as SectionKey].title}
            subtitle={
              appContent.about.sections[actualPath as SectionKey].subtitle
            }
            bannerIMG="/niseko_central_staff.jpg"
          />
          <Container
            sx={{
              display: "flex",
              flex: "1",
              position: "relative",
            }}
            disableGutters
          >
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
                        appContent.about.sections[aboutLink[0] as SectionKey]
                          .navlink
                      }
                    >
                      {
                        appContent.about.sections[aboutLink[0] as SectionKey]
                          .navlink
                      }
                    </AboutNavLinks>
                  );
                })}
              </Stack>
              <Box flex={"1"} px={{ md: "0", xs: "1rem" }}>
                <Outlet />
              </Box>
            </Stack>
          </Container>
        </Stack>
      </Suspense>
      <Footer />
    </Stack>
  );
}
