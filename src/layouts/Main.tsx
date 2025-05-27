import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "@mui/material";
import MuiBox from "../components/MuiBox";

export default function Main() {
  return (
    <div>
      <Header />
      <Container
        sx={{
          display: "flex",
          flex: "1",
        }}
        disableGutters
      >
        <MuiBox
          variant="primary"
          sx={{ width: "100%", height: "100%", border: "1px solid blue" }}
        >
          <Outlet />
        </MuiBox>
      </Container>
      <Footer />
    </div>
  );
}
