import "./App.css";
import "@mantine/dates/styles.css";
import { MantineProvider } from "@mantine/core";
import "dayjs/locale/ja";
import { lazy } from "react";
import { AppContext } from "./utils/context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useThemeMode from "./hooks/useThemeMode";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const Home = lazy(() => import("./pages/Home"));
const AboutLayout = lazy(() => import("./layouts/AboutLayout"));
import Main from "./layouts/Main";
import Auth from "./layouts/Auth";
import useLanguage from "./hooks/useLanguage";
import About from "./pages/About/About";
import Blog from "./pages/Blog";
import Niseko from "./pages/Niseko";
import Live from "./pages/Live";
import Weather from "./pages/Weather";
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

import useFetch from "./hooks/useFetch";
import Article from "./pages/Article";
import SignUpForm from "./pages/SignUpForm";
import NewBlogEntry from "./pages/NewBlogEntry";
import AddBooking from "./pages/AddBooking";
import NotFound from "./pages/NotFound";
import BookingCategory from "./pages/BookingCategory";
import ProtectedRoutes from "./layouts/ProtectedRoutes";

function App() {
  const { themeStyle, handleThemeChange, currentTheme } = useThemeMode(750);
  const { setLang, appContent, lang } = useLanguage();
  const {
    loading,
    contents,
    error,
    filteredContent,
    setFilteredContent,
    setLoading,
  } = useFetch();

  return (
    <BrowserRouter>
      <AppContext.Provider
        value={{
          handleThemeChange,
          currentTheme,
          setLang,
          appContent,
          lang,
          loading,
          error,
          contents,
          filteredContent,
          setFilteredContent,
          setLoading,
        }}
      >
        <ThemeProvider theme={themeStyle}>
          <MantineProvider>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={lang === "jp" ? "ja" : "en"}
            >
              <CssBaseline />
              <Routes>
                <Route element={<Main />}>
                  <Route path="/" element={<Home />} />
                  <Route element={<Auth />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signUp" element={<Signup />} />
                    <Route path="/signUpForm" element={<SignUpForm />} />
                  </Route>
                  <Route element={<ProtectedRoutes />}>
                    <Route path="/blog/newEntry" element={<NewBlogEntry />} />
                  </Route>
                </Route>
                <Route
                  path="/booking/:category"
                  element={<BookingCategory />}
                />
                <Route element={<GeneralLayout isBlog={false} />}>
                  <Route path="/niseko" element={<Niseko />} />
                  <Route path="/live" element={<Live />} />
                  <Route path="/Weather" element={<Weather />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/special-deals" element={<SpecialDeals />} />
                  <Route path="/guest-service" element={<GuestService />} />
                  <Route path="/add-booking" element={<AddBooking />} />
                </Route>
                <Route element={<GeneralLayout isBlog={true} />}>
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:title" element={<Article />} />
                </Route>
                <Route element={<AboutLayout />}>
                  <Route index path="/about" element={<About />} />
                  <Route path="/management" element={<Management />} />
                  <Route path="/niseko-jobs" element={<NisekoJobs />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </LocalizationProvider>
          </MantineProvider>
        </ThemeProvider>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
