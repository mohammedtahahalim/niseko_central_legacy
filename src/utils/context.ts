import { createContext } from "react";
import type { TAppContext } from "./types";
import defaultContent from "./en.json";

const defaultAppContext: TAppContext = {
  currentTheme: (localStorage.getItem("theme") as "light" | "dark") || "light",
  handleThemeChange: () => {},
  setLang: () => {},
  appContent: defaultContent,
  lang: "en",
  loading: true,
  contents: [],
  filteredContent: [],
  setFilteredContent: () => {},
  setLoading: () => {},
  error: "",
};

export const AppContext = createContext<TAppContext>(defaultAppContext);
