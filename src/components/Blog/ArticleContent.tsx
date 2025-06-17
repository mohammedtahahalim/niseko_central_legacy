import { useContext } from "react";
import useArticle from "../../hooks/useArticle";
import { AppContext } from "../../utils/context";
import { CircularProgress, styled } from "@mui/material";

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
  console.log(articleData, loading);
  if (loading) return <CircularProgress />;
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
