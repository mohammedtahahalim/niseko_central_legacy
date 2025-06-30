import { Box, CircularProgress, styled, Typography } from "@mui/material";
import Suggestions from "../../Suggestions";
import MuiBox from "../../MuiBox";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../utils/context";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { MoreInfo, SuggestionBox } from "../../../utils/types";
import { motion } from "framer-motion";

interface IOurCategories {
  data: MoreInfo;
}

const StyledCategories = styled(Box, {
  shouldForwardProp: (prop) => prop !== "danger",
})({
  flex: "1",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  alignItems: "center",
  overflow: "hidden",
});

const FeedBack = styled(Box, {
  shouldForwardProp: (prop) => prop !== "danger",
})({
  height: "fit-content",
});

const SuggestedBooking = styled(Box)({
  display: "grid",
  gap: "15px",
  width: "100%",
});

export default function OurCategories({ data }: IOurCategories) {
  const { lang, appContent } = useContext(AppContext);
  const [bookingSuggestions, setBookingSuggestions] = useState<SuggestionBox[]>(
    []
  );

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/getSuggestions?category=${
            data["en"].title
          }&k=6`
        );
        if (!response.ok) {
          return;
        }
        const tempData = await response.json();
        setBookingSuggestions(tempData.suggestions);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <StyledCategories p={{ md: "1.5rem", xs: "0rem" }}>
      <Typography
        variant="subtitle1"
        color="secondary"
        whiteSpace={"pre-line"}
        fontSize={{ md: "0.9rem", xs: "0.75rem" }}
      >
        {data[lang].description}
      </Typography>
      <Box
        width={{ md: "95%", xs: "100%" }}
        overflow={"hidden"}
        borderRadius={"5px"}
      >
        {data.location.url && (
          <a
            href={data.location.image}
            target="_blank"
            style={{ width: "100%" }}
          >
            <img src={data.location.url} width={"100%"} />
          </a>
        )}
      </Box>
      {data[lang].feedbacks.length !== 0 && (
        <FeedBack
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          gap={"15px"}
        >
          <Typography variant="h6" sx={{ alignSelf: "center" }}>
            {appContent.bookings_category.customers_feedback} {data[lang].title}
          </Typography>
          <Box
            width={"100%"}
            overflow={"hidden"}
            display={"flex"}
            height={"200px"}
          >
            <Swiper
              slidesPerView={1}
              spaceBetween={15}
              autoplay={{ delay: 1500 }}
              style={{
                height: "100%",
                width: "100%",
                paddingBottom: "35px",
                overflow: "hidden",
              }}
              modules={[Pagination]}
              pagination={{ clickable: true }}
            >
              {data[lang].feedbacks?.map((feedback) => {
                return (
                  <SwiperSlide
                    style={{
                      height: "99%",
                      width: "100%",
                      overflow: "hidden",
                      position: "relative",
                      borderRadius: "10px",
                    }}
                  >
                    <MuiBox
                      variant="hybrid"
                      sx={{
                        width: "95%",
                        height: { md: "50%", xs: "75%" },
                        p: "1rem",
                        fontFamily: "Source Code Pro",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "normal",
                      }}
                    >
                      {feedback.feedback}
                    </MuiBox>
                    <Box></Box>
                    <Typography
                      variant="body2"
                      sx={{ paddingLeft: "10px", paddingTop: "10px" }}
                      fontFamily={"Segoe UI"}
                      fontSize={"1rem"}
                    >
                      {feedback.author}
                    </Typography>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Box>
        </FeedBack>
      )}
      {bookingSuggestions.length ? (
        <SuggestedBooking
          sx={{
            gridTemplateColumns: {
              sm: "repeat(3, 1fr)",
              xs: "repeat(1, 1fr)",
            },
          }}
        >
          {bookingSuggestions.map((suggestion) => {
            return (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                key={suggestion.en_title}
              >
                <Suggestions
                  img={JSON.parse(suggestion.images)[0]}
                  type={
                    lang === "en"
                      ? suggestion.en_type_one.split(",")[0]
                      : suggestion.jp_type_one.split(",")[0]
                  }
                  category={
                    lang === "en" ? suggestion.en_title : suggestion.jp_title
                  }
                  lifts={suggestion.lifts}
                  maxPax={suggestion.max_pax}
                />
              </motion.div>
            );
          })}
        </SuggestedBooking>
      ) : (
        <CircularProgress color="secondary" sx={{ alignSelf: "center" }} />
      )}
    </StyledCategories>
  );
}
