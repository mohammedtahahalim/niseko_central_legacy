import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Stack, Container } from "@mui/material";
import { Suspense } from "react";
import Loading from "../components/Loading";

export default function Main() {
  return (
    <Stack direction={"column"} sx={{ height: "100%", minHeight: "100vh" }}>
      <Header />
      <Container
        sx={{
          display: "flex",
          flex: "1",
          position: "relative",
        }}
        disableGutters
      >
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </Container>
      <Footer />
    </Stack>
  );
}
