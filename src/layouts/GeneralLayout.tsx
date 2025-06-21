import { Stack, Container } from "@mui/material";
import { Suspense, useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Loading from "../components/Loading";
import Banner from "../components/Banner";
import { Outlet, useLocation } from "react-router-dom";
import { AppContext } from "../utils/context";
import BlogCarousel from "../components/BlogCarousel";

type TGeneralLayout = {
  isBlog?: boolean;
};

export default function GeneralLayout({ isBlog }: TGeneralLayout) {
  const title = useLocation().pathname.replace("/", "") || "";

  const { appContent } = useContext(AppContext);

  return (
    <Stack direction={"column"} sx={{ height: "100%", minHeight: "100vh" }}>
      <Header />
      <Suspense fallback={<Loading />}>
        <Stack direction={"column"} width={"100%"}>
          {!isBlog && (
            <Banner
              title={appContent.general_layout[title].title}
              subtitle={appContent.general_layout[title].sous_title}
              bannerIMG={appContent.general_layout[title].bannerIMG}
            />
          )}
          {isBlog && <BlogCarousel />}
          <Container
            sx={{
              display: "flex",
              flex: "1",
              position: "relative",
            }}
            disableGutters
          >
            <Outlet />
          </Container>
        </Stack>
      </Suspense>
      <Footer />
    </Stack>
  );
}
