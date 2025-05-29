export type TAppContext = {
  currentTheme: "light" | "dark";
  handleThemeChange: () => void;
  setLang: React.Dispatch<React.SetStateAction<"en" | "jp">>;
  appContent: { [key: string]: string };
};
