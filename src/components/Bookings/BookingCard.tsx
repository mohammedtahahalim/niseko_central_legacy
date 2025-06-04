import { Box, Stack } from "@mui/material";
import BookingImage from "./BookingImage";
import BookingInfo from "./BookingInfo";
import Book from "./Book";
import { styled } from "@mui/material";
import { useState } from "react";
import MoreInfo from "./MoreInfo";

const StyledStack = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "danger",
})(({ theme }) => ({
  overflow: "hidden",
  border: `0.1px solid ${theme.palette.divider}`,
  margin: "0.5rem",
  borderRadius: "10px",
  transition: "all 0.15s ease-in-out",
  "&:hover": {
    boxShadow: `6px 6px 12px ${theme.palette.info.main}`,
  },
}));

export default function BookingCard() {
  const [seeMore, setSeeMore] = useState<boolean>(false);
  const handleSeeMore = () => {
    setSeeMore((seeMore) => !seeMore);
  };
  return (
    <>
      <StyledStack direction={"column"}>
        <Stack
          borderRadius="5px"
          gap="5px"
          direction={{ md: "row", xs: "column" }}
          height={"fit-content"}
        >
          <BookingImage setSeeMore={handleSeeMore} seeMore={seeMore} />
          <BookingInfo />
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
    </>
  );
}
