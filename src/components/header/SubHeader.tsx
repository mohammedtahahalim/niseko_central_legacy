import { Box, Button, Container, Stack } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../utils/context";
import { Link } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function SubHeader() {
  const { currentTheme, handleThemeChange, appContent, setLang } =
    useContext(AppContext);
  return (
    <Box>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: "0.5rem",
        }}
        disableGutters
      >
        <Stack direction={"row"} gap={0.2}>
          {(Array.isArray(appContent.navMenu) ? appContent.navMenu : []).map(
            (element: any) => {
              return (
                <Button
                  key={element[0]}
                  component={Link}
                  to={element[1]}
                  size="small"
                >
                  {element[0]}
                </Button>
              );
            }
          )}
        </Stack>
        <Stack direction={"row-reverse"} alignItems={"center"} gap={0.2}>
          <Box
            onClick={handleThemeChange}
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              px: "0.5rem",
            }}
          >
            {currentTheme === "light" ? (
              <LightModeIcon fontSize="medium" />
            ) : (
              <DarkModeIcon fontSize="medium" />
            )}
          </Box>
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              setLang((lang) => (lang === "en" ? "jp" : "en"));
            }}
            sx={{ textTransform: "uppercase" }}
          >
            {appContent?.lang}
          </Button>
          <Button variant="text" component={Link} to="/signup">
            {appContent.createAccount}
          </Button>
          <Box sx={{ width: "1px", height: "15px", bgcolor: "#5E867A" }}></Box>
          <Button variant="text" component={Link} to="/login">
            {appContent.login}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
