import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../utils/context";
import { Box, CircularProgress, Stack, Container } from "@mui/material";
import type { MoreInfo } from "../utils/types";
import Banner from "../components/Banner";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Sidebar from "../components/Bookings/Category/Sidebar";
import OurCategories from "../components/Bookings/Category/OurCategories";

export default function BookingCategory() {
  const { category } = useParams();
  const { lang } = useContext(AppContext);
  const [data, setData] = useState<MoreInfo | null>(null);
  const navigator = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!category) {
      navigator("/not-found");
    }
    (async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/getMoreInfo?title=${category}`
        );
        if (!response.ok) {
          navigator("/not-found");
        }
        const tempData = await response.json();
        setData(tempData.property);
      } catch (err) {
        console.log(err);
        navigator("/not-found");
      } finally {
        setLoading(false);
      }
    })();
  }, [category]);

  return (
    <Stack direction={"column"} sx={{ height: "100%", minHeight: "100vh" }}>
      <Header />
      <Stack direction={"column"} width={"100%"}>
        {data && (
          <Banner
            title={lang === "en" ? "Accomodation" : "宿泊施設"}
            subtitle={data[lang].title}
            bannerIMG={data.banner_img}
          />
        )}
        <Container
          sx={{
            display: "flex",
            flex: "1",
            position: "relative",
            padding: "2rem",
          }}
          disableGutters
        >
          <Box
            width={"100%"}
            height={"100%"}
            display={"flex"}
            flexDirection={{ md: "row", xs: "column-reverse" }}
            gap={"10px"}
          >
            <Sidebar />
            {loading || !data ? (
              <Box
                width={"100%"}
                display={"flex"}
                justifyContent={"center"}
                marginTop={"3rem"}
              >
                <CircularProgress color="secondary" />
              </Box>
            ) : (
              <OurCategories data={data} />
            )}
          </Box>
        </Container>
      </Stack>
      <Footer />
    </Stack>
  );
}
