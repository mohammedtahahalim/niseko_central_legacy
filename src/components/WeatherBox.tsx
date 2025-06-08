import { styled, Box } from "@mui/material";
import { useEffect, useRef } from "react";

const StyledWeatherBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "danger",
})(({ theme }) => ({
  width: "100%",
  minHeight: "450px",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "25px",
}));

export default function WeatherBox() {
  const geoLocation = useRef({
    long: 0,
    lat: 0,
  });
  useEffect(() => {
    (async () => {
      navigator.geolocation.getCurrentPosition((position) => {
        geoLocation.current.long = position.coords.longitude;
        geoLocation.current.lat = position.coords.latitude;
      });
    })();
  }, []);

  return <StyledWeatherBox></StyledWeatherBox>;
}
