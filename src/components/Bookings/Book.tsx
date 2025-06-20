import { Box, Button, Stack } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { styled } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../utils/context";
import { Link } from "react-router-dom";

const StyledStack = styled(Stack)(({ theme }) => ({
  display: "flex",
  padding: "1rem 0.5rem",
  flex: "1",
  gap: "10px",
  position: "relative",
  flexDirection: "column",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
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

interface IBook {
  category: string;
}

export default function Book({ category }: IBook) {
  const { appContent } = useContext(AppContext);
  const formattedCategory = category.toLowerCase().split(" ").join("-").trim();
  return (
    <StyledStack>
      <StyledBox></StyledBox>
      <Button variant="contained" color="secondary">
        {appContent.book_now}
      </Button>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/booking/${formattedCategory}`}
      >
        {appContent.more_info}
      </Button>
      <Button variant="text" color="primary" startIcon={<MailIcon />}>
        {appContent.send_inquiry}
      </Button>
    </StyledStack>
  );
}
