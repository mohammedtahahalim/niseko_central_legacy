import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Stack, Container } from "@mui/material";

export default function Main() {
  return (
    <Stack
      direction={"column"}
      sx={{
        height: "100%",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Header />
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
      <Footer />
    </Stack>
  );
}
