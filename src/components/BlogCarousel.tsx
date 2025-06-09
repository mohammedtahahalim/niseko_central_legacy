import { styled, Box, Typography, Button } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../utils/context";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

interface CarouselBoxProps {
  length: number;
  currIndex: number;
  isTransitioning: boolean;
}

interface ImageBoxProps {
  backURL: string;
}

const StyledBox = styled(Box)({
  width: "100%",
  height: "450px",
  overflow: "hidden",
});

const CarouselBox = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "length" && prop !== "currIndex" && prop !== "isTransitioning",
})<CarouselBoxProps>(({ length, currIndex, isTransitioning }) => ({
  width: `${length * 100}%`,
  height: "100%",
  display: "flex",
  transform: `translateX(-${(currIndex * 100) / length}%)`,
  transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
}));

const ImageBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "backURL",
})<ImageBoxProps>(({ backURL }) => ({
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

const StyledArticle = styled(Box)(({ theme }) => ({
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
  [theme.breakpoints.down("md")]: {
    maxWidth: "250px",
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: "450px",
  },
}));

const IndicatorBox = styled(Box)({
  position: "fixed",
  left: "50%",
  transform: "translate3d(-50%, -200%, 0)",
  display: "flex",
  gap: "5px",
  zIndex: "5",
});

export default function BlogCarousel() {
  const { appContent } = useContext(AppContext);
  const [currIndex, setCurrIndex] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const coolDownRef = useRef<boolean>(true);
  const carouselData = appContent.blog.carousel;
  const extendedCarousel = [
    carouselData[carouselData.length - 1],
    ...carouselData,
    carouselData[0],
  ];

  const handleTransitionEnd = () => {
    if (currIndex === 0) {
      setIsTransitioning(false);
      setCurrIndex(carouselData.length);
    } else if (currIndex === carouselData.length + 1) {
      setIsTransitioning(false);
      setCurrIndex(1);
    }
  };

  const handleClick = (state: "next" | "previous") => {
    if (coolDownRef.current) {
      coolDownRef.current = false;
      state === "next"
        ? setCurrIndex((prev) => prev + 1)
        : setCurrIndex((prev) => prev - 1);
    }
    setTimeout(() => {
      coolDownRef.current = true;
    }, 550);
  };

  useEffect(() => {
    if (!isTransitioning) {
      requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
    }
  }, [isTransitioning]);

  return (
    <StyledBox>
      <CarouselBox
        length={extendedCarousel.length}
        currIndex={currIndex}
        isTransitioning={isTransitioning}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedCarousel.map((carouselEntry, idx) => {
          return (
            <ImageBox backURL={carouselEntry[1]} key={idx}>
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
                onClick={() => handleClick("next")}
              >
                <KeyboardDoubleArrowRightIcon />
              </StyledButton>
              <StyledButton
                variant="text"
                color="secondary"
                sx={{
                  left: "10px",
                }}
                onClick={() => handleClick("previous")}
              >
                <KeyboardDoubleArrowLeftIcon />
              </StyledButton>
            </ImageBox>
          );
        })}
      </CarouselBox>
      <IndicatorBox>
        {carouselData.map((_, idx) => {
          return (
            <Box
              key={idx}
              sx={{
                width: "15px",
                aspectRatio: "1",
                borderRadius: "50px",
                cursor: "pointer",
              }}
              bgcolor={idx === currIndex - 1 ? "#CCCCCC" : "#FFFFFF"}
            ></Box>
          );
        })}
      </IndicatorBox>
    </StyledBox>
  );
}
