import SubHeader from "../components/header/SubHeader";
import MainHeader from "../components/header/MainHeader";
import NavMenu from "../components/header/NavMenu";
import { Container, Stack } from "@mui/material";
import MuiBox from "../components/MuiBox";
import styled from "@emotion/styled";

const mobileMenu = styled("div")({
  width: "150px",
  height: "100vh",
  position: "absolute",
});

export default function Header() {
  return (
    <Stack
      direction={"column"}
      sx={{
        position: "relative",
      }}
    >
      <MuiBox variant="secondary" sx={{ display: { xs: "none", sm: "flex" } }}>
        <Container disableGutters>
          <SubHeader />
        </Container>
      </MuiBox>

      <MuiBox variant="primary">
        <Container disableGutters>
          <MainHeader />
        </Container>
      </MuiBox>
      <MuiBox variant="secondary" sx={{ display: { xs: "none", sm: "flex" } }}>
        <Container disableGutters>
          <NavMenu />
        </Container>
      </MuiBox>
    </Stack>
  );
}
