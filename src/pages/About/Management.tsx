import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../utils/context";

export default function Management() {
  const { appContent } = useContext(AppContext);
  return (
    <Box
      p={{ md: "2rem 3rem", xs: "2rem 1rem" }}
      display={"flex"}
      flexDirection={"column"}
      gap={"1.5rem"}
    >
      {appContent.about.sections.management.description.map((question) => {
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
            <Typography variant="body1">{question[1]}</Typography>
          </Box>
        );
      })}
      {
        <Typography variant="body1" sx={{ fontWeight: "700" }}>
          {appContent.about.sections.management.contact}
        </Typography>
      }
    </Box>
  );
}
