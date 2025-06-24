import { Box, Button, styled, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useState, type Ref } from "react";
import { Link } from "react-router-dom";

const PostBox = styled(Box, { shouldForwardProp: (prop) => prop !== "danger" })(
  {
    padding: "0.5rem",
    display: "flex",
    gap: "10px",
  }
);

const ImageWrapper = styled(Box)({
  flex: "1.5",
  aspectRatio: "4/3",
  alignSelf: "center",
  width: "100%",
  maxWidth: "350px",
  overflow: "hidden",
  borderRadius: "5px",
  position: "relative",
});
interface PostProps {
  image: {
    image: string;
    blur: string;
  };
  category: string;
  title: string;
  date: string;
  desc: string;
  ref?: Ref<HTMLDivElement>;
  link: string;
}

export default function Post({
  image,
  category,
  title,
  date,
  desc,
  ref,
  link,
}: PostProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  return (
    <PostBox flexDirection={{ sm: "row", xs: "column" }} ref={ref}>
      <ImageWrapper>
        <img
          src={image.blur}
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            opacity: isLoaded ? 0 : 1,
            transition: "opacity 0.5s linear",
          }}
        />
        <img
          src={image.image}
          alt=""
          width={"100%"}
          height={"100%"}
          style={{
            objectFit: "cover",
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.5s linear",
          }}
          onLoad={() => setIsLoaded(true)}
        />
      </ImageWrapper>
      <Box
        flex={"2"}
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
        alignSelf={"center"}
        maxWidth={"350px"}
        sx={{ "& > *": { px: "0.5rem" } }}
        gap={"8px"}
      >
        <Typography variant="body1" textAlign={"left"} color="secondary">
          {category}
        </Typography>
        <Button
          variant="text"
          sx={{ p: "0.5rem", display: "flex", justifyContent: "flex-start" }}
          component={Link}
          to={encodeURIComponent(link)}
        >
          <Typography variant="h6" textAlign={"start"}>
            {title}
          </Typography>
        </Button>
        <Box display={"flex"} gap={"5px"} alignItems={"center"}>
          <CalendarMonthIcon sx={{ fontSize: "1rem" }} color="primary" />
          <Typography variant="subtitle1" color="secondary">
            {date}
          </Typography>
        </Box>
        <Typography variant="body1">{desc}</Typography>
        <Box
          display={"flex"}
          gap={"10px"}
          marginTop={"auto"}
          marginBottom={"15px"}
          alignItems={"center"}
        >
          <FacebookIcon sx={{ fontSize: "2rem" }} color="primary" />
          <XIcon sx={{ fontSize: "1.7rem" }} color="primary" />
        </Box>
      </Box>
    </PostBox>
  );
}
