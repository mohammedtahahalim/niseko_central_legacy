import {
  Box,
  Button,
  CircularProgress,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useContext, useRef } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../utils/context";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import Post from "../components/Blog/Post";
import useIntersectObserver from "../hooks/useIntersectObserver";
import useTopK from "../hooks/useTopK";
import { motion } from "framer-motion";

const SimpleNavLink = styled(NavLink, {
  shouldForwardProp: (prop) => prop !== "danger",
})(({ theme }) => ({
  textDecoration: "none",
  textTransform: "capitalize",
  color: theme.palette.primary.main,
  fontFamily: "Source Code Pro",
  fontSize: "0.8rem",
  "&:hover": {
    color: theme.palette.secondary.main,
  },
}));

export default function Blog() {
  const { appContent, lang } = useContext(AppContext);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const { numToShow } = useIntersectObserver({
    currRef: sentinelRef,
    min: 2,
    max: 6,
    increment: 2,
  });

  const { topKBlogs, loading } = useTopK(8);

  return (
    <Stack
      direction={{ md: "row", xs: "column-reverse" }}
      width={"100%"}
      gap={"1rem"}
      p={"1rem"}
    >
      <Stack direction={"column"} flex={1} gap={"2rem"}>
        <Box display={"flex"} flexDirection={"column"} gap={"0.5rem"}>
          <Typography variant="h6" color="primary">
            {appContent.blog.blog_intro.title}
          </Typography>
          <Typography variant="body1" color="secondary">
            {appContent.blog.blog_intro.desc}
          </Typography>
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={"0.5rem"}>
          <Typography variant="h6" color="primary">
            {appContent.blog.category_part.title}
          </Typography>
          {appContent.blog.category_part.categories.map((category) => {
            return (
              <SimpleNavLink to={category[1]} key={category[0]}>
                {category[0]}
              </SimpleNavLink>
            );
          })}
        </Box>
        <Box display={"flex"} flexDirection={"column"}>
          <RssFeedIcon sx={{ fontSize: "1.2rem" }} color="secondary" />
          <Button
            href="https://www.nisekocentral.com/blog/feed.rss"
            sx={{ width: "fit-content", px: "0rem" }}
            size="small"
          >
            {appContent.blog.rss_feed}
          </Button>
        </Box>
      </Stack>
      <Stack direction={"column"} flex={3} gap={"1rem"}>
        <Typography variant="h6" color="primary">
          {appContent.blog.posts.title}
        </Typography>
        {loading ? (
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            marginTop={"3rem"}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {topKBlogs.slice(0, numToShow).map((element) => {
              return (
                <motion.div
                  initial={{ x: 25, y: 0, opacity: 0 }}
                  animate={{ x: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  key={element.en_title}
                >
                  <Post
                    image={element.banner_img}
                    category={
                      lang === "en" ? element.en_category : element.jp_category
                    }
                    title={lang === "en" ? element.en_title : element.jp_title}
                    date={element.date}
                    desc="Enjoy the great outdoors and have a whole lot of fun with spring rafting in Niseko."
                    link={element.en_title}
                  />
                </motion.div>
              );
            })}
          </>
        )}
        <div ref={sentinelRef} style={{ height: 1 }}></div>
      </Stack>
    </Stack>
  );
}
