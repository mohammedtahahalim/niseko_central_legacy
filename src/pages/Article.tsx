import { useParams } from "react-router-dom";
import { Box, Button, Stack, styled, Typography } from "@mui/material";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../utils/context";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ArticleContent from "../components/Blog/ArticleContent";

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
export default function Article() {
  const { appContent } = useContext(AppContext);
  const title = useParams()["title"] || "";
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
      <Stack direction={"column"} flex={3} gap={"1rem"} overflow={"hidden"}>
        <ArticleContent title={title} />
      </Stack>
    </Stack>
  );
}
