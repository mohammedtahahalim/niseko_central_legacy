import { styled, Typography } from "@mui/material";

const StyledBox = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "danger",
})(({ theme }) => ({
  color: theme.palette.primary.main,
  marginTop: "8px",
}));

export default function Description() {
  return (
    <StyledBox variant="subtitle2">
      This fourth floor modern and comfortable 2 bedroom, 1 bathroom unit enjoys
      good ski hill views and has a fully equipped kitchen and laundry. Central
      upper village location close to the lifts, restaurants and shops.
    </StyledBox>
  );
}
