import { Box, styled, Typography } from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

const SquareDown = styled(Box)({
  position: "absolute",
  top: "100%",
  left: "25px",
  width: "15px",
  aspectRatio: "1",
  "& svg": {
    transform: "translateY(-38%)",
  },
});

const TestimonyBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  position: "relative",
  borderRadius: "8px",
  padding: "0.9rem",
}));

type TTestimony = {
  testimonyContent: string;
  author: string;
};

export default function Testimony({ testimonyContent, author }: TTestimony) {
  return (
    <Box width={"100%"} display={"flex"} flexDirection={"column"} gap={"15px"}>
      <TestimonyBox>
        <Typography variant="subtitle1" color="#fff">
          {testimonyContent}
        </Typography>
        <SquareDown>
          <KeyboardDoubleArrowDownIcon fontSize="small" color="secondary" />
        </SquareDown>
      </TestimonyBox>
      <Typography
        variant="subtitle1"
        color="secondary"
        fontSize={"1.1rem"}
        fontWeight={"600"}
      >
        {author}
      </Typography>
    </Box>
  );
}
