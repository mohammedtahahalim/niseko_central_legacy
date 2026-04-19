import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useRef, useState } from "react";
import { AppContext } from "../../utils/context";
import { Link, useLocation } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";
import MobileMenu from "./MobileMenu";

export default function PreHeader() {
  const { currentTheme, handleThemeChange, appContent, setLang } =
    useContext(AppContext);
  const [transition, setTransition] = useState<boolean>(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const currentLocation = useLocation().pathname;

  return (
    <>
      <Box
        display={{ sm: "none", xs: "flex" }}
        p={"0.5rem"}
        alignItems={"center"}
        gap={"5px"}
      >
        <MobileMenu
          transition={transition}
          setTransition={setTransition}
          menuRef={menuRef}
        />
        <IconButton onClick={() => setTransition(false)}>
          <div ref={menuRef} style={{ display: "flex", gap: "5px" }}>
            <MenuIcon color="secondary" />
            <Typography variant="subtitle1" fontSize={"1rem"}>
              {appContent.header.menu}
            </Typography>
          </div>
        </IconButton>
      </Box>
      <Box display={{ sm: "flex", xs: "none" }}>
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
            {appContent &&
              appContent.header.navMenu.map((element: string[]) => {
                return (
                  <Button
                    key={element[0]}
                    component={Link}
                    to={element[1]}
                    size="small"
                    color={
                      currentLocation === element[1] ? "secondary" : "primary"
                    }
                    variant={
                      currentLocation === element[1] ? "outlined" : "text"
                    }
                  >
                    {element[0]}
                  </Button>
                );
              })}
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
                <LightModeIcon fontSize="medium" color="secondary" />
              ) : (
                <DarkModeIcon fontSize="medium" color="secondary" />
              )}
            </Box>
            <Button
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                setLang((lang) => (lang === "en" ? "jp" : "en"));
              }}
              sx={{ textTransform: "uppercase" }}
              color="secondary"
            >
              {appContent.lang}
            </Button>
            <Button variant="text" component={Link} to="/signup">
              {appContent.createAccount}
            </Button>
            <Box
              sx={{ width: "1px", height: "15px", bgcolor: "#5E867A" }}
            ></Box>
            <Button variant="text" component={Link} to="/login">
              {appContent.login}
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
