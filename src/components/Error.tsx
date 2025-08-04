import { styled, Box } from "@mui/material";

interface IError {
  errorMsg: string;
}

const ErrorContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  marginTop: "2rem",
  fontFamily: "Source Code Pro",
  fontSize: "1.5rem",
  color: theme.palette.secondary.main,
}));

export default function Error({ errorMsg }: IError) {
  return <ErrorContainer>{errorMsg}</ErrorContainer>;
}
