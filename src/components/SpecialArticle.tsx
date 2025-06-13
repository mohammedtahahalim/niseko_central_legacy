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
  position: "relative",
  "&:hover": {
    "&::after": {
      "--angle": "0deg",
      content: "''",
      position: "absolute",
      width: "calc(100% + 6px)",
      height: "calc(100% + 6px)",
      translate: "-3px -3px",
      top: "0",
      left: "0",
      backgroundImage:
        "conic-gradient(from var(--angle), #ff4545, #00ff99, #006aff, #ff0095, #ff4545)",
      zIndex: "-1",
      animation: "spin 4s linear infinite",
    },
  },
});

const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "danger",
})(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: "0.5rem",
}));

export default function SpecialArticle({
  bannerIMG,
  title,
  desc,
  link,
}: TSpecialArticle) {
  return (
    <StyledArticle flexDirection={{ md: "row", xs: "column" }}>
      <StyledBox
        maxWidth={{ md: "300px", xs: "100%" }}
        sx={{ aspectRatio: "4/3" }}
      >
        <img src={bannerIMG} alt={title} width={"100%"} height={"100%"} />
      </StyledBox>
      <StyledBox
        display={"flex"}
        flexDirection={"column"}
        gap={"5px"}
        flex={"1"}
        py={"0.75rem"}
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
      </StyledBox>
    </StyledArticle>
  );
}
