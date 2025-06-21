import { Box } from "@mui/material";
import { useState } from "react";

interface IBookingImage {
  image: Record<string, string>;
}

export default function BookingImage({ image }: IBookingImage) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <Box
      width={{ md: "35%", xs: "100%" }}
      height={"100%"}
      maxHeight={"230px"}
      p={{ xs: "0.5rem 0.5rem", md: "0.5rem" }}
      display={"flex"}
      flexDirection={"column"}
    >
      <Box
        width={{ md: "100%", sm: "50%", xs: "100%" }}
        overflow={"hidden"}
        alignSelf={"center"}
        sx={{ aspectRatio: "1" }}
        position={"relative"}
      >
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
}
