import { useContext } from "react";
import useArticle from "../../hooks/useArticle";
import { AppContext } from "../../utils/context";
import { Box, CircularProgress, styled } from "@mui/material";

interface IArticleContent {
  title: string;
}

const StyledDiv = styled("div", {
  shouldForwardProp: (prop) => prop !== "danger",
})(({ theme }) => ({
  padding: "0rem 3rem",
  "& *": {
    backgroundColor: "transparent !important",
    fontFamily: "Source Code Pro",
  },
  "& p > span": {
    color: `${theme.palette.primary.main} !important`,
  },
}));

export default function ArticleContent({ title }: IArticleContent) {
  const { lang } = useContext(AppContext);
  const { articleData, loading } = useArticle(title);

  if (loading)
    return (
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        marginTop={"3rem"}
      >
        <CircularProgress />
      </Box>
    );
  return (
    <StyledDiv
      dangerouslySetInnerHTML={{
        __html:
          lang === "en"
            ? articleData?.en_content ?? ""
            : articleData?.jp_content ?? "",
      }}
    ></StyledDiv>
  );
}
