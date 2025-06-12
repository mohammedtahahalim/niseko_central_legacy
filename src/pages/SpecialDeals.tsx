import { Stack, Typography, Box, Button } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../utils/context";
import SpecialArticle from "../components/SpecialArticle";
import Suggestions from "../components/Suggestions";
import { Link } from "react-router-dom";

export default function SpecialDeals() {
  const { appContent } = useContext(AppContext);
  return (
    <Stack direction={"column"} width={"100%"} p={"2rem"} gap={"2rem"}>
      <Typography
        variant="h6"
        color="primary"
        textAlign={"center"}
        maxWidth={"900px"}
        alignSelf={"center"}
      >
        {appContent.specialDeals.title}
      </Typography>
      {appContent.specialDeals.articles.map((article) => {
        return (
          <SpecialArticle
            bannerIMG={article[0]}
            title={article[1]}
            desc={article[2]}
            link={article[3]}
          />
        );
      })}
      <Button
        variant="outlined"
        size="large"
        color="secondary"
        sx={{ width: "fit-content", alignSelf: "center" }}
      >
        {appContent.find_more_button}
      </Button>
      <Box
        display={"flex"}
        flexDirection={{ md: "row", xs: "column" }}
        gap={"1.5rem"}
        alignSelf={"center"}
        margin={"1rem 0rem"}
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
        sx={{ width: "fit-content", alignSelf: "center" }}
      >
        {appContent.find_all_button}
      </Button>
    </Stack>
  );
}
