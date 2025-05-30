import { Stack, Box } from "@mui/system";
import MuiBox from "../MuiBox";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useContext, useEffect, useRef, type RefObject } from "react";
import { AppContext } from "../../utils/context";
import { Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

interface TMobileMenu {
  transition: boolean;
  setTransition: React.Dispatch<React.SetStateAction<boolean>>;
  menuRef: RefObject<HTMLDivElement | null>;
}

export default function MobileMenu({
  transition,
  setTransition,
  menuRef,
}: TMobileMenu) {
  const mobileRef = useRef(null);
  const { setLang, appContent, handleThemeChange, currentTheme } =
    useContext(AppContext);
  const currentLocation = useLocation().pathname;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !mobileRef.current ||
        (mobileRef.current as HTMLElement).contains(e.target as Node) ||
        (menuRef.current as HTMLElement).contains(e.target as Node)
      ) {
        return;
      }
      setTransition(true);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={mobileRef}>
      <MuiBox
        variant="secondary"
        sx={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "250px",
          height: "100vh",
          transform: transition ? "translateX(-100%)" : "translateX(0px)",
          transition: "transform 0.25s ease-in-out",
          zIndex: "5",
        }}
      >
        <Stack direction={"column"} gap={"0.5rem"} p={"1rem"}>
          {"header" in appContent &&
            appContent.header.mobileMenu.map((element: any) => {
              return (
                <Button
                  component={Link}
                  to={element[1]}
                  key={element[0]}
                  color={
                    currentLocation === element[1] ? "secondary" : "primary"
                  }
                  variant={
                    currentLocation === element[1] ? "outlined" : "contained"
                  }
                >
                  {element[0]}
                </Button>
              );
            })}
          <Button
            variant="contained"
            color="secondary"
            onClick={() =>
              "lang" in appContent && appContent.lang === "English"
                ? setLang("en")
                : setLang("jp")
            }
            sx={{ maxWidth: "50%", alignSelf: "center" }}
          >
            {"lang" in appContent && appContent.lang}
          </Button>
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
        </Stack>
      </MuiBox>
    </div>
  );
}
