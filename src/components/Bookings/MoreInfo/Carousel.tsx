import { IconButton, styled } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const ContainerCarouselBox = styled(Box)({
  width: "100%",
  aspectRatio: "4/3",
  overflow: "hidden",
  marginTop: "2rem",
  borderRadius: "12px",
  position: "relative",
});
const CarouselBox = styled(Box)<{
  length: number;
  index: number;
}>(({ length, index }) => ({
  display: "flex",
  width: `${length * 100}%`,
  height: "100%",
  transform: `translateX(-${(index * 100) / length}%)`,
}));

interface ICarousel {
  images: { url: string; blur: string }[];
}

export default function Carousel({ images }: ICarousel) {
  const [index, setIndex] = useState<number>(1);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (index === images.length) {
      setIndex(1);
    }
    if (index === 0) {
      setIndex(images.length - 1);
    }
  }, [index]);

  console.log(isLoaded);

  return (
    <ContainerCarouselBox>
      <CarouselBox length={images.length} index={index}>
        {images.map((image, index) => {
          return (
            <Box
              key={index}
              sx={{
                flex: "1 0 0%",
                width: `${100 / images.length}%`,
                height: "100%",
                display: "flex",
              }}
            >
              <Box width={"100%"} height={"100%"} position={"relative"}>
                <img
                  src={image.blur}
                  alt="placeholder"
                  style={{
                    width: "100%",
                    height: "100%",
                    transition: "opacity 0.3s ease",
                    opacity: isLoaded ? 0 : 1,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    borderRadius: "12px",
                    objectFit: "cover",
                  }}
                />
                <img
                  src={image.url}
                  alt="Placeholder"
                  width={"100%"}
                  height={"100%"}
                  style={{
                    borderRadius: "12px",
                    objectFit: "cover",
                    transition: "opacity 0.3s ease",
                    opacity: isLoaded ? 1 : 0,
                    display: "block",
                  }}
                  onLoad={() => setIsLoaded(true)}
                  loading="lazy"
                />
              </Box>
            </Box>
          );
        })}
      </CarouselBox>
      <IconButton
        onClick={() => setIndex(Math.max(index - 1, 0))}
        sx={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "transparent",
          backdropFilter: "blur(6px)",
          zIndex: 2,
          borderRadius: "50%",
          boxShadow: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <KeyboardDoubleArrowLeftIcon />
      </IconButton>
      <IconButton
        onClick={() => setIndex(Math.min(index + 1, images.length))}
        sx={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "transparent",
          backdropFilter: "blur(6px)",
          zIndex: 2,
          borderRadius: "50%",
          boxShadow: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <KeyboardDoubleArrowRightIcon />
      </IconButton>
    </ContainerCarouselBox>
  );
}
