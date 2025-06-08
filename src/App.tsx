import "./App.css";
import "@mantine/dates/styles.css";
import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useThemeMode from "./hooks/useThemeMode";
import { MantineProvider } from "@mantine/core";
import { CssBaseline, ThemeProvider } from "@mui/material";
const Home = lazy(() => import("./pages/Home"));
const AboutLayout = lazy(() => import("./layouts/AboutLayout"));
import { AppContext } from "./utils/context";
import Main from "./layouts/Main";
import Auth from "./layouts/Auth";
import useLanguage from "./hooks/useLanguage";
import About from "./pages/About/About";
import Blog from "./pages/Blog";
import Niseko from "./pages/Niseko";
import Live from "./pages/Live";
import Weather from "./pages/Weather";
import LongStay from "./pages/LongStay";
import SpecialDeals from "./pages/SpecialDeals";
import GuestService from "./pages/GuestService";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Management from "./pages/About/Management";
import NisekoJobs from "./pages/About/NisekoJobs";
import Testimonials from "./pages/About/Testimonials";
import GeneralLayout from "./layouts/GeneralLayout";

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
                <Route path="/blog" element={<Blog />} />
                <Route path="/long-stay" element={<LongStay />} />
                <Route path="/special-deals" element={<SpecialDeals />} />
                <Route path="/guest-service" element={<GuestService />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
              </Route>
              <Route element={<GeneralLayout />}>
                <Route path="/niseko" element={<Niseko />} />
                <Route path="/live" element={<Live />} />
                <Route path="/Weather" element={<Weather />} />
              </Route>
              <Route element={<AboutLayout />}>
                <Route index path="/about" element={<About />} />
                <Route path="/management" element={<Management />} />
                <Route path="/niseko-jobs" element={<NisekoJobs />} />
                <Route path="/testimonials" element={<Testimonials />} />
              </Route>
              <Route element={<Auth />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>
            </Routes>
          </MantineProvider>
        </ThemeProvider>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
