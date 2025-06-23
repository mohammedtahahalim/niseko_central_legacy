import { Stack, Typography, Box, Button } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../utils/context";
import SpecialArticle from "../components/SpecialArticle";
import Suggestions from "../components/Suggestions";
import { Link } from "react-router-dom";
import type { SuggestionBox } from "../utils/types";

export default function SpecialDeals() {
  const { appContent, lang } = useContext(AppContext);
  const [someSuggestions, setSomeSuggestions] = useState<
    SuggestionBox[] | null
  >(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/getSuggestions?&k=4`
        );
        if (!response.ok) {
          return;
        }
        const tempData = await response.json();
        setSomeSuggestions(tempData.suggestions);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

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
      {someSuggestions && (
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
            <Suggestions
              img={JSON.parse(someSuggestions[0].images)[0]}
              type={
                lang === "en"
                  ? someSuggestions[0].en_type_one.split(",")[0]
                  : someSuggestions[0].jp_type_one.split(",")[0]
              }
              category={
                lang === "en"
                  ? someSuggestions[0].en_title
                  : someSuggestions[0].jp_title
              }
              lifts={someSuggestions[0].lifts}
              maxPax={someSuggestions[0].max_pax}
            />
            <Suggestions
              img={JSON.parse(someSuggestions[1].images)[0]}
              type={
                lang === "en"
                  ? someSuggestions[1].en_type_one.split(",")[0]
                  : someSuggestions[1].jp_type_one.split(",")[0]
              }
              category={
                lang === "en"
                  ? someSuggestions[1].en_title
                  : someSuggestions[1].jp_title
              }
              lifts={someSuggestions[1].lifts}
              maxPax={someSuggestions[1].max_pax}
            />
          </Box>
          <Box
            display={"flex"}
            flexDirection={{ sm: "row", xs: "column" }}
            gap={"1.5rem"}
          >
            <Suggestions
              img={JSON.parse(someSuggestions[2].images)[0]}
              type={
                lang === "en"
                  ? someSuggestions[2].en_type_one.split(",")[0]
                  : someSuggestions[2].jp_type_one.split(",")[0]
              }
              category={
                lang === "en"
                  ? someSuggestions[2].en_title
                  : someSuggestions[2].jp_title
              }
              lifts={someSuggestions[2].lifts}
              maxPax={someSuggestions[2].max_pax}
            />
            <Suggestions
              img={JSON.parse(someSuggestions[3].images)[0]}
              type={
                lang === "en"
                  ? someSuggestions[3].en_type_one.split(",")[0]
                  : someSuggestions[3].jp_type_one.split(",")[0]
              }
              category={
                lang === "en"
                  ? someSuggestions[3].en_title
                  : someSuggestions[3].jp_title
              }
              lifts={someSuggestions[3].lifts}
              maxPax={someSuggestions[3].max_pax}
            />
          </Box>
        </Box>
      )}
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
