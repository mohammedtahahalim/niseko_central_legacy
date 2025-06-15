import { Box, Stack } from "@mui/material";
import BookingImage from "./BookingImage";
import BookingInfo from "./BookingInfo";
import Book from "./Book";
import { styled } from "@mui/material";
import { memo, useState } from "react";
import MoreInfo from "./MoreInfo";

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

const BookingCard = memo(function BookingCard() {
  const [seeMore, setSeeMore] = useState<boolean>(false);
  const handleSeeMore = () => {
    setSeeMore((seeMore) => !seeMore);
  };
  return (
    <StyledStack direction={"column"}>
      <Stack
        borderRadius="5px"
        gap="5px"
        direction={{ md: "row", xs: "column" }}
        height={"fit-content"}
      >
        <BookingImage />
        <BookingInfo setSeeMore={handleSeeMore} seeMore={seeMore} />
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
        <MoreInfo />
      </Box>
    </StyledStack>
  );
});

export default BookingCard;
