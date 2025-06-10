import PreHeader from "../components/Header/PreHeader";
import Welcome from "../components/Header/Welcome";
import { Container, Stack } from "@mui/material";
import MuiBox from "../components/MuiBox";
import PostHeader from "../components/Header/PostHeader";
import { useContext } from "react";
import { AppContext } from "../utils/context";

export default function Header() {
  const { currentTheme } = useContext(AppContext);
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

      <MuiBox
        variant="primary"
        sx={{
          borderBottom: {
            sm: "none",
            xs: `1px solid ${currentTheme === "dark" ? "#181818" : "#E7E7E7"}`,
          },
        }}
      >
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
