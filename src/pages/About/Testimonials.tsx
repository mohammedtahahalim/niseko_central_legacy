import { Box, Typography } from "@mui/material";
import Testimony from "../../components/Testimony";
import { useContext } from "react";
import { AppContext } from "../../utils/context";

export default function Testimonials() {
  const { appContent } = useContext(AppContext);
  return (
    <Box
      p={{ md: "2rem 3rem", xs: "2rem 1rem" }}
      display={"flex"}
      flexDirection={"column"}
      gap={"1.5rem"}
    >
      <Typography variant="h6" color="primary">
        {appContent.about.testimony_title}
      </Typography>
      <Box display={"flex"} flexDirection={"column"} gap={"2rem"}>
        {appContent.about.testimonies.map((testimony, idx) => {
          return (
            <Testimony
              author={testimony[1]}
              testimonyContent={testimony[0]}
              key={testimony[1] + idx}
            />
          );
        })}
      </Box>
    </Box>
  );
}
