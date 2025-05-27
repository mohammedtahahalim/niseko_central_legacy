import SubHeader from "../components/header/SubHeader";
import MainHeader from "../components/header/MainHeader";
import NavMenu from "../components/header/NavMenu";
import { Stack } from "@mui/material";
import MuiBox from "../components/MuiBox";
import styled from "@emotion/styled";

const mobileMenu = styled("div")({
  width: "150px",
  height: "100vh",
  position: "absolute",
});

export default function Header() {
  return (
    <Stack direction={"column"} sx={{ position: "relative" }}>
      <MuiBox variant="secondary" sx={{ display: { xs: "none", sm: "flex" } }}>
        <SubHeader />
      </MuiBox>
      <MuiBox variant="primary" sx={{ p: "1rem" }}>
        <MainHeader />
      </MuiBox>
      <MuiBox variant="secondary" sx={{ display: { xs: "none", sm: "flex" } }}>
        <NavMenu />
      </MuiBox>
    </Stack>
  );
}
