import { Box, Stack } from "@mui/material";
import BookingImage from "./BookingImage";
import BookingInfo from "./BookingInfo";
import Book from "./Book";
import { styled } from "@mui/material";
import { memo, useContext, useState } from "react";
import MoreInfo from "./MoreInfo";
import type { bookingDetails } from "../../utils/types";
import { AppContext } from "../../utils/context";

const StyledStack = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "danger",
})(({ theme }) => ({
  border: `0.1px solid ${theme.palette.divider}`,
  margin: "0.5rem",
  borderRadius: "10px",
  backgroundColor: theme.palette.background.default,
  position: "relative",
  "&:hover": {
    "&::after": {
      "--angle": "0deg",
      content: "''",
      position: "absolute",
      height: "calc(100% + 6px)",
      width: "calc(100% + 6px)",
      borderRadius: "10px",
      top: "50%",
      left: "50%",
      translate: "-50% -50%",
      zIndex: "-1",
      backgroundImage:
        "conic-gradient(from var(--angle), #D5B0FC, #0F83FD, #C3FDFD, #81B9FA, #9980FD, #4B82FA, #FADDED, #D5B0FC)",
      animation: "spin 4s linear infinite",
    },
  },
}));

interface IBookingCard {
  bookingDetail: bookingDetails;
}

const BookingCard = memo(function BookingCard({ bookingDetail }: IBookingCard) {
  const [seeMore, setSeeMore] = useState<boolean>(false);
  const handleSeeMore = () => {
    setSeeMore((seeMore) => !seeMore);
  };
  const { lang } = useContext(AppContext);
  return (
    <StyledStack direction={"column"}>
      <Stack
        borderRadius="5px"
        gap="5px"
        direction={{ md: "row", xs: "column" }}
        height={"fit-content"}
      >
        <BookingImage image={bookingDetail.images[0]} />
        <BookingInfo
          setSeeMore={handleSeeMore}
          seeMore={seeMore}
          title={
            lang === "en" ? bookingDetail.en_title : bookingDetail.jp_title
          }
          category={
            lang === "en"
              ? bookingDetail.en_category
              : bookingDetail.jp_category
          }
          floorSize={bookingDetail.floor_size}
          liftWithin={bookingDetail.lifts}
          villageCenter={bookingDetail.village_distance}
          view={bookingDetail.view}
          type_one={
            lang === "en"
              ? bookingDetail.en_type_one
              : bookingDetail.jp_type_one
          }
          type_two={
            lang === "en"
              ? bookingDetail.en_type_two
              : bookingDetail.jp_type_two
          }
        />
        <Book />
      </Stack>
      <Box
        overflow={"hidden"}
        maxHeight={seeMore ? "750px" : "0px"}
        sx={{
          transition: `max-height 0.4s ease-in-out`,
        }}
        alignSelf={"center"}
        width={"95%"}
      >
        <MoreInfo
          beds={
            lang === "en"
              ? bookingDetail.en_type_one.split(", ")[1]
              : bookingDetail.jp_type_one.split("、")[1]
          }
          maxPax={bookingDetail.max_pax}
          amenities={
            lang === "en"
              ? bookingDetail.amenities.join(",")
              : bookingDetail.jp_amenities.join(",")
          }
          desc={
            lang === "en"
              ? bookingDetail.short_desc
              : bookingDetail.jp_short_desc
          }
          images={bookingDetail.images}
        />
      </Box>
    </StyledStack>
  );
});

export default BookingCard;
