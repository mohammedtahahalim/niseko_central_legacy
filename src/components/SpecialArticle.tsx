import { Box, Button, styled, Typography } from "@mui/material";

interface TSpecialArticle {
  bannerIMG: string;
  title: string;
  desc: string;
  link: string;
}

const StyledArticle = styled(Box, {
  shouldForwardProp: (prop) => prop !== "danger",
})({
  maxWidth: "750px",
  alignSelf: "center",
  display: "flex",
  overflow: "hidden",
});

export default function SpecialArticle({
  bannerIMG,
  title,
  desc,
  link,
}: TSpecialArticle) {
  return (
    <StyledArticle
      flexDirection={{ md: "row", xs: "column" }}
      gap={{ md: "20px", xs: "8px" }}
    >
      <Box maxWidth={{ md: "300px", xs: "100%" }} sx={{ aspectRatio: "4/3" }}>
        <img src={bannerIMG} alt={title} width={"100%"} height={"100%"} />
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"5px"}
        flex={"1"}
        py={"0.5rem"}
      >
        <Button
          variant="text"
          component={"a"}
          href={link}
          sx={{
            p: "0rem",
            textAlign: "left",
            width: "fit-content",
          }}
        >
          <Typography variant="h6" color="primary">
            {title}
          </Typography>
        </Button>
        <Typography variant="body1">{desc}</Typography>
      </Box>
    </StyledArticle>
  );
}
