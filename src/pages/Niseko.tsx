import { Box, Button, Stack, Typography } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../utils/context";
import Suggestions from "../components/Suggestions";
import { Link } from "react-router-dom";
import type { SuggestionBox } from "../utils/types";

export default function Niseko() {
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
        {someSuggestions && (
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
        >
          {appContent.find_all_button}
        </Button>
      </Box>
    </Stack>
  );
}
