import "./App.css";
import "@mantine/dates/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useThemeMode from "./hooks/useThemeMode";
import { MantineProvider } from "@mantine/core";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Home from "./pages/Home";
import { AppContext } from "./utils/context";
import Main from "./layouts/Main";
import useLanguage from "./hooks/useLanguage";

function App() {
  const { themeStyle, handleThemeChange, currentTheme } = useThemeMode(500);
  const { setLang, appContent, lang } = useLanguage();

  return (
    <BrowserRouter>
      <AppContext.Provider
        value={{ handleThemeChange, currentTheme, setLang, appContent, lang }}
      >
        <ThemeProvider theme={themeStyle}>
          <MantineProvider>
            <CssBaseline />
            <Routes>
              <Route element={<Main />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<Home />} />
                <Route path="/blog" element={<Home />} />
                <Route path="/niseko" element={<Home />} />
                <Route path="/live" element={<Home />} />
                <Route path="/Weather" element={<Home />} />
                <Route path="/long-stay" element={<Home />} />
                <Route path="/special-deals" element={<Home />} />
                <Route path="/guest-service" element={<Home />} />
                <Route path="/faq" element={<Home />} />
                <Route path="/contact" element={<Home />} />
              </Route>
              <Route path="/login" element={<Home />} />
              <Route path="/signup" element={<Home />} />
            </Routes>
          </MantineProvider>
        </ThemeProvider>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
