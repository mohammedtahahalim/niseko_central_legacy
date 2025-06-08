import { Box, Button, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../utils/context";
import WeatherBox from "../components/WeatherBox";

export default function Weather() {
  const { appContent } = useContext(AppContext);
  return (
    <Stack
      direction={"column"}
      width={"100%"}
      maxWidth={"800px"}
      p={"2rem"}
      gap={"2rem"}
    >
      <Typography variant="h6" color="primary">
        {appContent.weather.title}
      </Typography>
      <WeatherBox />
      <Box>
        <Typography variant="h6" color="primary" fontSize={"0.9rem"}>
          {appContent.weather.useful_links.name}
        </Typography>
        <ul>
          {appContent.weather.useful_links.links.map((link) => {
            return (
              <li key={link[0]}>
                <Button
                  variant="text"
                  color="primary"
                  href={link[1]}
                  sx={{ p: "0rem" }}
                >
                  {link[0]}
                </Button>
              </li>
            );
          })}
        </ul>
      </Box>
    </Stack>
  );
}
