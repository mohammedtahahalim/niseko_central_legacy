import { useRef, useState } from "react";
import { createTheme } from "@mui/material";
import type { PaletteOptions } from "@mui/material/styles";

const getInitialTheme = (): "light" | "dark" => {
  const storedTheme = localStorage.getItem("theme");
  return storedTheme === "light" || storedTheme === "dark"
    ? storedTheme
    : window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export default function useThemeMode(threshold: number = 500) {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(
    getInitialTheme
  );

  const themeCooldown = useRef<boolean>(false);

  const lightPalette: PaletteOptions = {
    primary: {
      main: "#4A637D",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#3498db",
      contrastText: "#e0e0e0",
    },
  };

  const darkPalette: PaletteOptions = {
    primary: {
      main: "#7895B1",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#e74c3c",
      contrastText: "#ecf0f1",
    },
  };

  const themeStyle = createTheme({
    palette: {
      mode: currentTheme,
      ...(currentTheme === "light" ? lightPalette : darkPalette),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "capitalize",
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: currentTheme === "light" ? "#3498db" : "#e74c3c",
            textTransform: "capitalize",
          },
          subtitle1: {
            fontSize: "0.9rem",
            fontFamily: "Source Code Pro",
          },
        },
        variants: [
          {
            props: { color: "primary" },
            style: {
              color: currentTheme === "light" ? "#3498db" : "#e74c3c",
            },
          },
          {
            props: { color: "secondary" },
            style: {
              color: currentTheme === "light" ? "#4A637D" : "#7895B1",
            },
          },
        ],
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fontSize: "1.75rem",
            cursor: "pointer",
            transition: "all 0.25s ease-in-out",
            "&:hover": {
              color: currentTheme === "light" ? "#3498db" : "#e74c3c",
            },
          },
        },
      },
    },
  });

  const handleThemeChange = () => {
    if (themeCooldown.current) return;
    themeCooldown.current = true;
    setCurrentTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
    localStorage.setItem("theme", currentTheme === "light" ? "dark" : "light");
    let timer = setTimeout(() => {
      themeCooldown.current = false;
    }, threshold);
    return () => {
      clearTimeout(timer);
    };
  };

  return { currentTheme, themeStyle, handleThemeChange };
}
