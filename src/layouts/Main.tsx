import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Box, Container, styled } from "@mui/material";

const MainWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  overflow: "hidden",
  flexDirection: "column",
});

const BodyWrapper = styled(Container)({
  flex: 1,
  overflow: "hidden",
  width: "100%",
});

export default function Main() {
  return (
    <MainWrapper>
      <Header />
      <BodyWrapper disableGutters maxWidth="xl">
        <Outlet />
      </BodyWrapper>
      <Footer />
    </MainWrapper>
  );
}
