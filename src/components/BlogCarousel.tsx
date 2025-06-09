import { styled, Box, Typography, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../utils/context";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

interface CarouselBoxProps {
  length: number;
  currIndex: number;
}

interface ImageBoxProps {
  backURL: string;
}

const StyledBox = styled(Box)({
  width: "100%",
  height: "450px",
  overflow: "hidden",
});

const CarouselBox = styled(Box)<CarouselBoxProps>(({ length, currIndex }) => ({
  width: `${length * 100}%`,
  height: "100%",
  display: "flex",
  transform: `translateX(-${(currIndex * 100) / length}%)`,
}));

const ImageBox = styled(Box)<ImageBoxProps>(({ backURL }) => ({
  height: "100%",
  flex: "1",
  position: "relative",
  backgroundImage: `url(${backURL})`,
  backgroundSize: "cover",
}));

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "danger",
})({
  backdropFilter: "blur(2px)",
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: "3",
});

const Overlay = styled(Box)({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: "0",
  left: "0",
  backdropFilter: "blur(2px)",
  zIndex: "2",
});

const Title = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "danger",
})({
  textAlign: "center",
  fontSize: "1.2rem",
});

const StyledArticle = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate3d(-50%, -50%, 0)",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "10px",
  zIndex: "3",
  backdropFilter: "blur(2px)",
  width: "100%",
  maxWidth: "450px",
});

export default function BlogCarousel() {
  const { appContent } = useContext(AppContext);
  const [currIndex, setCurrIndex] = useState<number>(1);

  useEffect(() => {
    if (currIndex === 0) {
      setCurrIndex(4);
    }
    if (currIndex === 5) {
      setCurrIndex(1);
    }
  }, [currIndex]);

  return (
    <StyledBox>
      <CarouselBox
        length={appContent.blog.carousel.length}
        currIndex={currIndex}
      >
        {appContent.blog.carousel.map((carouselEntry) => {
          return (
            <ImageBox backURL={carouselEntry[1]}>
              <Overlay />
              <StyledArticle>
                <Title variant="h6" color="primary">
                  {carouselEntry[0]}
                </Title>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ width: "fit-content", alignSelf: "center" }}
                  component={"a"}
                  href={carouselEntry[2]}
                  target="_blank"
                >
                  {appContent.read_more}
                </Button>
              </StyledArticle>
              <StyledButton
                variant="text"
                color="secondary"
                sx={{
                  right: "10px",
                }}
                onClick={() =>
                  setCurrIndex(
                    Math.min(currIndex + 1, appContent.blog.carousel.length - 1)
                  )
                }
              >
                <KeyboardDoubleArrowRightIcon />
              </StyledButton>
              <StyledButton
                variant="text"
                color="secondary"
                sx={{
                  left: "10px",
                }}
                onClick={() => setCurrIndex(Math.max(currIndex - 1, 0))}
              >
                <KeyboardDoubleArrowLeftIcon />
              </StyledButton>
            </ImageBox>
          );
        })}
      </CarouselBox>
    </StyledBox>
  );
}
