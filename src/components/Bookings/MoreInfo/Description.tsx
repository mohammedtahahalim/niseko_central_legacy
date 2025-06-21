import { Box, styled } from "@mui/material";

const StyledBox = styled(Box, {
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
    <StyledBox>
      <div dangerouslySetInnerHTML={{ __html: desc }}></div>
    </StyledBox>
  );
}
