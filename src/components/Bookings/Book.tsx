import { Box, Button, Stack } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { styled } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../utils/context";

const StyledStack = styled(Stack)(({ theme }) => ({
  display: "flex",
  padding: "1rem 0.5rem",
  flex: "1",
  gap: "10px",
  position: "relative",
  [theme.breakpoints.up("md")]: {
    flexDirection: "column",
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    alignSelf: "center",
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  height: "80%",
  top: "10%",
  left: "0",
  width: "1px",
  backgroundColor: theme.palette.divider,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export default function Book() {
  const { appContent } = useContext(AppContext);
  return (
    <StyledStack>
      <StyledBox></StyledBox>
      <Button variant="contained" color="secondary">
        {appContent.book_now}
      </Button>
      <Button variant="text" color="primary" startIcon={<MailIcon />}>
        {appContent.send_inquiry}
      </Button>
    </StyledStack>
  );
}
