import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../utils/context";

export default function About() {
  const { appContent } = useContext(AppContext);
  return (
    <Box
      p={{ md: "2rem 3rem", xs: "2rem 1rem" }}
      display={"flex"}
      flexDirection={"column"}
      gap={"1.5rem"}
    >
      {appContent.about.sections.about.description.map((question) => {
        return (
          <Box
            key={question[0]}
            gap={"1.5rem"}
            display={"flex"}
            flexDirection={"column"}
          >
            <Typography variant="h6" color="primary">
              {question[0]}
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
              {question[1]}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
