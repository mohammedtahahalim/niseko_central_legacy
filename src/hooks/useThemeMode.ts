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
      contrastText: "#D1D5DB",
    },
    secondary: {
      main: "#2563EB",
      contrastText: "#e0e0e0",
    },
  };

  const darkPalette: PaletteOptions = {
    primary: {
      main: "#7895B1",
      contrastText: "#D1D5DB",
    },
    secondary: {
      main: "#FF6B6B",
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
            color: currentTheme === "light" ? "#2563EB" : "#FF6B6B",
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
              color: currentTheme === "light" ? "#2563EB" : "#FF6B6B",
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
              color: currentTheme === "light" ? "#2563EB" : "#FF6B6B",
            },
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontFamily: "Source Code Pro",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            '&[type="range"]': {
              border: "none",
              accentColor: currentTheme === "light" ? "#2563EB" : "#FF6B6B",
              width: "100%",
              padding: 0,
              margin: 0,
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
