import { useRef, useState } from "react";
import { createTheme } from "@mui/material";
import type { PaletteOptions } from "@mui/material/styles";

export default function useThemeMode(threshold: number = 500) {
  const getInitialTheme = (): "light" | "dark" => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : "light";
  };
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(
    getInitialTheme()
  );

  const themeCooldown = useRef<boolean>(false);

  const lightPalette: PaletteOptions = {
    primary: {
      main: "#3498db",
      contrastText: "#e0e0e0",
    },
    secondary: {
      main: "#1abc9c",
      contrastText: "#ffffff",
    },
  };

  const darkPalette: PaletteOptions = {
    primary: {
      main: "#e74c3c",
      contrastText: "#ecf0f1",
    },
    secondary: {
      main: "#9b59b6",
      contrastText: "#ffffff",
    },
  };

  const themeStyle = createTheme({
    palette: {
      mode: currentTheme,
      ...(currentTheme === "light" ? lightPalette : darkPalette),
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
