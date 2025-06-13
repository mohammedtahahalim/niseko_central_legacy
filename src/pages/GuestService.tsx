import { Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../utils/context";
import NavBar from "../components/Guest/NavBar";
import { Swiper, SwiperSlide } from "swiper/react";

export default function GuestService() {
  const { appContent } = useContext(AppContext);
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
      <Stack direction={"column"}>right</Stack>
    </Stack>
  );
}
