import { styled, Typography } from "@mui/material";

const StyledBox = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "danger",
})(({ theme }) => ({
  color: theme.palette.primary.main,
  marginTop: "8px",
}));

interface IDescription {
  desc: string;
}

export default function Description({ desc }: IDescription) {
  return (
    <StyledBox variant="body2">
      <div dangerouslySetInnerHTML={{ __html: desc }}></div>
    </StyledBox>
  );
}
