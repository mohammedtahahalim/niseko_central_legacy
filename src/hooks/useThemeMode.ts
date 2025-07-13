import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createTheme } from "@mui/material";
import type { PaletteOptions, Theme } from "@mui/material/styles";

interface IUseThemMode {
  currentTheme: "light" | "dark";
  themeStyle: Theme;
  handleThemeChange: () => void;
}

const getInitialTheme = (): "light" | "dark" => {
  try {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } catch (err) {
    console.log(
      "Error Fetching theme from local storage and match media, defaulting back to light"
    );
    return "light";
  }
};

export default function useThemeMode(threshold: number = 350): IUseThemMode {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(
    getInitialTheme
  );
  const themeCooldown = useRef<number>(0);

  const lightPalette: PaletteOptions = {
    primary: {
      main: "#4A637D",
      contrastText: "#D1D5DB",
    },
    secondary: {
      main: "#4D6EC2",
      contrastText: "#e0e0e0",
    },
    info: {
      main: "rgb(77,110,194, 0.3)",
      contrastText: "#000",
    },
    success: {
      main: "#66BB6A",
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
    info: {
      main: "rgb(255,107,107, 0.15)",
      contrastText: "#fff",
    },
    success: {
      main: "#E56448",
    },
  };

  const themeStyle = useMemo(
    () =>
      createTheme({
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
                color: currentTheme === "light" ? "#4D6EC2" : "#FF6B6B",
                textTransform: "capitalize",
              },
              subtitle1: {
                fontSize: "0.9rem",
                fontFamily: "Source Code Pro",
              },
              subtitle2: {
                fontSize: "0.8rem",
              },
              h6: {
                fontSize: "1.1rem",
                fontFamily: "Source Code Pro",
                fontWeight: "600",
              },
              h5: {
                fontFamily: "Source Code Pro",
              },
              body1: {
                color: currentTheme === "light" ? "#000000" : "#ffffff",
                fontSize: "0.9rem",
                fontFamily: "Source Code Pro",
              },
            },
            variants: [
              {
                props: { color: "primary" },
                style: {
                  color: currentTheme === "light" ? "#4D6EC2" : "#FF6B6B",
                },
              },
              {
                props: { color: "secondary" },
                style: {
                  color: currentTheme === "light" ? "#4A637D" : "#7895B1",
                },
              },
              {
                props: { color: "success" },
                style: {
                  color: "green",
                },
              },
              {
                props: { color: "error" },
                style: {
                  color: "red",
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
                  color: currentTheme === "light" ? "#4D6EC2" : "#FF6B6B",
                },
              },
            },
          },
          MuiInputLabel: {
            styleOverrides: {
              root: {
                zIndex: 1,
                paddingLeft: "4px",
                paddingRight: "4px",
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              input: {
                '&[type="range"]': {
                  border: "none",
                  accentColor: currentTheme === "light" ? "#4D6EC2" : "#FF6B6B",
                  width: "100%",
                  padding: 0,
                  margin: 0,
                },
              },
            },
          },
        },
      }),
    [currentTheme]
  );

  const handleThemeChange = useCallback(() => {
    const date = Date.now();
    if (date - themeCooldown.current < threshold) return;
    setCurrentTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  }, [themeCooldown]);

  useEffect(() => {
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (!matchMedia) return;
    const handleMediaChange = () => {
      setCurrentTheme(matchMedia.matches ? "dark" : "light");
    };
    matchMedia.addEventListener("change", handleMediaChange);
    return () => {
      matchMedia.removeEventListener("change", handleMediaChange);
    };
  }, []);

  return { currentTheme, themeStyle, handleThemeChange };
}
