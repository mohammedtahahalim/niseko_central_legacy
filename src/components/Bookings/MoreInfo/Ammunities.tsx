import { styled } from "@mui/material";
import { Box } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "0.8rem",
  fontFamily: "Inter",
}));

interface IAmmunities {
  amenities: string;
}

export default function Ammunities({ amenities }: IAmmunities) {
  return <StyledBox>{amenities}</StyledBox>;
}
