import { Box, styled, Typography } from "@mui/material";
import { useRef, useState, useLayoutEffect } from "react";

interface AccordionProps {
  isLast: boolean;
  isClicked: boolean;
  title: string;
  content: string;
  handleActive: () => void;
}

interface StyledAccordtionProps {
  isLast: boolean;
  isClicked: boolean;
  currMaxHeight: number;
}

const StyledAccordtion = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "isLast" && prop !== "isClicked" && prop !== "currMaxHeight",
})<StyledAccordtionProps>(({ theme, isLast, isClicked, currMaxHeight }) => ({
  maxWidth: "550px",
  maxHeight: isClicked ? "1000px" : `${currMaxHeight}px`,
  borderBottom: isLast ? "none" : `1px solid ${theme.palette.divider}`,
  transition: `all ${isClicked ? 1 : 0.65}s ease-in-out`,
  overflow: "hidden",
  padding: "1rem 0rem",
}));

const StyledContent = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "danger",
})(({ theme }) => ({
  color: theme.palette.info.contrastText,
  padding: "5px 0px",
  fontFamily: "Source Code Pro",
}));

export default function Accordion({
  isLast = true,
  isClicked = false,
  title,
  content,
  handleActive,
}: AccordionProps) {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const [currMaxHeight, setCurrMaxHeight] = useState<number>(0);

  useLayoutEffect(() => {
    if (titleRef.current) {
      setCurrMaxHeight(titleRef.current.offsetHeight + 25);
    }
  }, []);
  return (
    <StyledAccordtion
      isLast={isLast}
      isClicked={isClicked}
      currMaxHeight={currMaxHeight}
    >
      <Typography
        variant="h6"
        color="secondary"
        sx={{ cursor: "pointer" }}
        onClick={handleActive}
        ref={titleRef}
      >
        {title}
      </Typography>
      <StyledContent variant="body2">{content}</StyledContent>
    </StyledAccordtion>
  );
}
