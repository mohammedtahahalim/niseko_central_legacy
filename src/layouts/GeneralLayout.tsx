import { Stack, Container } from "@mui/material";
import { Suspense, useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Loading from "../components/Loading";
import Banner from "../components/Banner";
import { Outlet, useLocation } from "react-router-dom";
import { AppContext } from "../utils/context";
export default function GeneralLayout() {
  const title = useLocation().pathname.split("-").join(" ").replace("/", "");
  const { appContent } = useContext(AppContext);
  console.log(appContent.general_layout[title].sous_title);
  return (
    <Stack direction={"column"} sx={{ height: "100%", minHeight: "100vh" }}>
      <Header />
      <Suspense fallback={<Loading />}>
        <Stack direction={"column"} width={"100%"}>
          <Banner
            title={appContent.general_layout[title].title}
            subtitle={appContent.general_layout[title].sous_title}
            bannerIMG={appContent.general_layout[title].bannerIMG}
          />
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
