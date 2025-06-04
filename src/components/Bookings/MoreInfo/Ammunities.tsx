import { styled } from "@mui/material";
import { Box } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "0.8rem",
  fontFamily: "Inter",
}));

export default function Ammunities() {
  return (
    <StyledBox>
      Card key, Smart TV, Gondola Shuttle - Winter Only, Free WiFi, Netflix
    </StyledBox>
  );
}
