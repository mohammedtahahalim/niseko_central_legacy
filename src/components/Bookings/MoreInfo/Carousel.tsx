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

export default function Carousel() {
  const [images] = useState<string[]>([
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
  ]);
  const [index, setIndex] = useState<number>(1);

  useEffect(() => {
    if (index === images.length) {
      setIndex(1);
    }
    if (index === 0) {
      setIndex(images.length - 1);
    }
  }, [index]);

  console.log(index);

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
              <img
                src={image}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                alt=""
              />
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
