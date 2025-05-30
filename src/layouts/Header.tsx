import PreHeader from "../components/header/PreHeader";
import Welcome from "../components/header/Welcome";
import { Container, Stack } from "@mui/material";
import MuiBox from "../components/MuiBox";
import PostHeader from "../components/header/PostHeader";
//import styled from "@emotion/styled";

/*
const mobileMenu = styled("div")({
  width: "150px",
  height: "100vh",
  position: "absolute",
});
*/

export default function Header() {
  return (
    <Stack
      direction={"column"}
      sx={{
        position: "relative",
      }}
    >
      <MuiBox variant="secondary">
        <Container disableGutters sx={{ position: "relative" }}>
          <PreHeader />
        </Container>
      </MuiBox>

      <MuiBox variant="primary">
        <Container disableGutters>
          <Welcome />
        </Container>
      </MuiBox>
      <MuiBox variant="secondary" sx={{ display: { xs: "none", sm: "flex" } }}>
        <Container disableGutters>
          <PostHeader />
        </Container>
      </MuiBox>
    </Stack>
  );
}
