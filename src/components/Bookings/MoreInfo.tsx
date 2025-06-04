import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../utils/context";
import Ammunities from "./MoreInfo/Ammunities";
import Description from "./MoreInfo/Description";
import Carousel from "./MoreInfo/Carousel";

const StyledBox = styled(Box)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: "0.5rem 1rem",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("md")]: {
    gap: "8px",
  },
}));

export default function MoreInfo() {
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
          4 Beds, Maximum 5 guests
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
      <Ammunities />
      <Description />
      <Carousel />
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
