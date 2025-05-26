import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useThemeMode from "./hooks/useThemeMode";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Home from "./pages/Home";
import { AppContext } from "./utils/context";
import Main from "./layouts/Main";

function App() {
  const { themeStyle, handleThemeChange, currentTheme } = useThemeMode(2000);
  return (
    <BrowserRouter>
      <AppContext.Provider value={{ handleThemeChange, currentTheme }}>
        <ThemeProvider theme={themeStyle}>
          <CssBaseline />
          <Routes>
            <Route element={<Main />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
