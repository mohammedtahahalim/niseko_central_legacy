import { useContext } from "react";
import useArticle from "../../hooks/useArticle";
import { AppContext } from "../../utils/context";
import { Box, CircularProgress, styled } from "@mui/material";
import Error from "../Error";

interface IArticleContent {
  title: string;
}

const StyledDiv = styled("div", {
  shouldForwardProp: (prop) => prop !== "danger",
})(({ theme }) => ({
  "& *": {
    backgroundColor: "transparent !important",
    fontFamily: "Source Code Pro",
    maxWidth: "100%",
  },
  "& p > span": {
    color: `${theme.palette.primary.main} !important`,
  },
}));

export default function ArticleContent({ title }: IArticleContent) {
  const { lang } = useContext(AppContext);
  const { articleData, loading, error } = useArticle(title);

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
    <>
      {!error && articleData && (
        <StyledDiv
          sx={{ p: { md: "0rem 3rem", xs: "0rem 1rem" } }}
          dangerouslySetInnerHTML={{
            __html:
              lang === "en"
                ? articleData?.en_content ?? ""
                : articleData?.jp_content ?? "",
          }}
        ></StyledDiv>
      )}
      {error && (
        <Error
          errorMsg={
            lang === "en" ? "Article Not Found ..." : "記事が見つかりません ..."
          }
        />
      )}
    </>
  );
}
