import { Box, Button, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../utils/context";
import NavBar from "../components/Guest/NavBar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export default function GuestService() {
  const { appContent, lang } = useContext(AppContext);
  const [mobileView, setMobileView] = useState<number>(
    window.innerWidth < 600 ? 1 : window.innerWidth > 1080 ? 3 : 2
  );

  useEffect(() => {
    const widthChangeTrack = () => {
      setMobileView(
        window.innerWidth < 600 ? 1 : window.innerWidth > 1080 ? 3 : 2
      );
    };
    window.addEventListener("resize", widthChangeTrack);
    return () => {
      window.removeEventListener("resize", widthChangeTrack);
    };
  }, []);

  return (
    <Stack
      direction={{ md: "row", xs: "column-reverse" }}
      width={"100%"}
      p={"2rem"}
      gap={"2rem"}
    >
      <Stack direction={"column"}>
        <Typography variant="h6" color="secondary">
          {appContent.guestService.choose}
        </Typography>
        {appContent.guestService.services.map((service, idx) => {
          return (
            <NavBar title={service.title} links={service.content} key={idx} />
          );
        })}
      </Stack>
      <Stack
        direction={"column"}
        overflow={"hidden"}
        flex={"1"}
        display={"flex"}
        flexDirection={"column"}
        gap={"10px"}
      >
        {appContent.guestService.services.map((service) => {
          return (
            <Box
              key={service.title}
              minHeight={"350px"}
              display={"flex"}
              flexDirection={"column"}
              gap={"10px"}
            >
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography variant="h6" color="primary">
                  {service.title}
                </Typography>
                <Button
                  variant="text"
                  endIcon={<ArrowRightAltIcon />}
                  sx={{ fontFamily: "Source Code Pro" }}
                  color="secondary"
                >
                  {lang === "en" ? "Browser all" : "すべてをブラウザで"}
                </Button>
              </Box>
              <Box flex={"1"}>
                <Swiper
                  slidesPerView={mobileView}
                  spaceBetween={15}
                  autoplay={{ delay: 1500 }}
                  style={{
                    height: "100%",
                    width: "100%",
                    paddingBottom: "35px",
                  }}
                  modules={[Pagination]}
                  pagination={{ clickable: true }}
                >
                  {service.content.map((serviceContent) => {
                    return (
                      <SwiperSlide
                        style={{
                          height: "99%",
                        }}
                      >
                        <Box
                          width={"100%"}
                          height={"100%"}
                          display={"flex"}
                          flexDirection={"column"}
                          overflow={"hidden"}
                        >
                          <Box
                            width={"100%"}
                            sx={{ aspectRatio: "4.5/3" }}
                            borderRadius={"3px"}
                            overflow={"hidden"}
                          >
                            <img
                              src={serviceContent[2]}
                              alt={serviceContent[0]}
                              width={"100%"}
                              height={"100%"}
                            />
                          </Box>
                          <Typography
                            variant="h6"
                            color="primary"
                            fontSize={"0.9rem"}
                          >
                            {serviceContent[0]}
                          </Typography>
                          <Typography
                            variant="body1"
                            color="info"
                            fontSize={"0.8rem"}
                          >
                            {serviceContent[1]}
                          </Typography>
                        </Box>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Stack>
  );
}
