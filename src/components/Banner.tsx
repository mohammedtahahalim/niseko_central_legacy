import { styled, Box, Typography, Container } from "@mui/material";

const StyledBox = styled(Box)({
  width: "100%",
  height: "350px",
  position: "relative",
});
const Background = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bannerIMG",
})<{ bannerIMG: string }>(({ bannerIMG }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: `url(${bannerIMG})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "blur(1.1px)",
  zIndex: 1,
}));
const Overlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  zIndex: 2,
});

const StyledTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "danger",
})({
  zIndex: "3",
  position: "relative",
  alignSelf: "flex-end",
  backdropFilter: "blur(4px)",
  backgroundColor: "transparent",
  width: "fit-content",
  padding: "5px",
});

interface TBanner {
  title: string;
  subtitle: string;
  bannerIMG: string;
}

export default function Banner({ title, subtitle, bannerIMG }: TBanner) {
  return (
    <StyledBox>
      <Background bannerIMG={bannerIMG} />
      <Overlay />
      <Container
        sx={{
          height: "100%",
          maxWidth: "1536px",
          position: "relative",
        }}
      >
        <Box position={"absolute"} bottom={"25px"} left={"25px"}>
          <StyledTypography variant="h6">{title}</StyledTypography>
          <StyledTypography variant="h5" sx={{ color: "white" }}>
            {subtitle}
          </StyledTypography>
        </Box>
      </Container>
    </StyledBox>
  );
}
