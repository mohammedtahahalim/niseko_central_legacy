import { createContext } from "react";
import type { TAppContext } from "./types";

const defaultAppContext: TAppContext = {
  currentTheme: (localStorage.getItem("theme") as "light" | "dark") || "light",
  handleThemeChange: () => {},
};

export const AppContext = createContext<TAppContext>(defaultAppContext);
