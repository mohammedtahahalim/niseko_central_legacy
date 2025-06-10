import { Box, Button, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../utils/context";
import Suggestions from "../components/Suggestions";
import { Link } from "react-router-dom";

export default function Niseko() {
  const { appContent } = useContext(AppContext);
  return (
    <Stack direction={"column"} width={"100%"}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"2rem"}
        p={"1.5rem"}
        margin={"2rem 0rem"}
        maxWidth={"800px"}
      >
        {appContent.niseko_informations.map((miniArticle) => {
          return (
            <Box
              key={miniArticle[0]}
              display={"flex"}
              flexDirection={"column"}
              gap={"1rem"}
            >
              <Typography variant="h6" color="primary">
                {miniArticle[0]}
              </Typography>
              {miniArticle[1] && (
                <img
                  src={miniArticle[1]}
                  alt={miniArticle[0]}
                  style={{ borderRadius: "8px" }}
                />
              )}
              <Typography
                variant="body2"
                whiteSpace={"pre-line"}
                color="secondary"
                fontSize={"0.9rem"}
                fontFamily={"Source Code Pro"}
              >
                {miniArticle[2]}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Box
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={"1rem"}
        marginBottom={"2rem"}
      >
        <Button variant="outlined" size="large" color="secondary">
          {appContent.find_more_button}
        </Button>
        <Box
          display={"flex"}
          flexDirection={{ md: "row", xs: "column" }}
          gap={"1.5rem"}
        >
          <Box
            display={"flex"}
            flexDirection={{ sm: "row", xs: "column" }}
            gap={"1.5rem"}
          >
            <Suggestions />
            <Suggestions />
          </Box>
          <Box
            display={"flex"}
            flexDirection={{ sm: "row", xs: "column" }}
            gap={"1.5rem"}
          >
            <Suggestions />
            <Suggestions />
          </Box>
        </Box>
        <Button
          variant="text"
          size="large"
          color="primary"
          component={Link}
          to={"/"}
        >
          {appContent.find_all_button}
        </Button>
      </Box>
    </Stack>
  );
}
