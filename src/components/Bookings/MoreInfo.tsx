import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../utils/context";
import Ammunities from "./MoreInfo/Ammunities";
import Description from "./MoreInfo/Description";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

const StyledBox = styled(Box)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: "0.5rem 1rem",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("md")]: {
    gap: "8px",
  },
}));

interface IMoreInfo {
  beds: string;
  maxPax: number;
  amenities: string;
  desc: string;
  images: { url: string; blur: string }[];
}

export default function MoreInfo({
  beds,
  maxPax,
  amenities,
  desc,
  images,
}: IMoreInfo) {
  const { appContent } = useContext(AppContext);
  return (
    <StyledBox>
      <Box
        display={"flex"}
        gap={{ md: "5px", xs: "1px" }}
        flexDirection={{ md: "row", xs: "column" }}
      >
        <Typography
          variant="subtitle2"
          color="secondary"
          fontSize={"0.9rem"}
          fontWeight={"600"}
        >
          {beds}, {appContent.booking_card.maximum} {maxPax}{" "}
          {appContent.booking_card.guests}
        </Typography>
        <Typography
          variant="subtitle2"
          color="secondary"
          fontSize={"0.8rem"}
          fontWeight={"400"}
          alignSelf={"center"}
        >
          {appContent.charges_apply}
        </Typography>
      </Box>
      <Ammunities amenities={amenities} />
      <Description desc={desc} />
      <Swiper
        slidesPerView={1}
        spaceBetween={15}
        autoplay={{ delay: 1500 }}
        style={{
          width: "100%",
          aspectRatio: "4/3",
          paddingBottom: "35px",
          marginTop: "25px",
        }}
        modules={[Pagination]}
        pagination={{ clickable: true }}
      >
        {images.map((image, idx) => {
          return (
            <SwiperSlide key={idx}>
              <img
                src={image.url}
                alt="Place Holder"
                style={{ width: "100%", height: "100%", borderRadius: "12px" }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Typography
        variant="subtitle2"
        color="secondary"
        sx={{ marginTop: "5px" }}
      >
        {appContent.general_image_advise}
      </Typography>
    </StyledBox>
  );
}
