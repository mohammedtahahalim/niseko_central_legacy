import { Button, Stack, styled, Typography, Box } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../utils/context";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "danger",
})({
  width: "100%",
  maxWidth: "450px",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  padding: "8px 0px",
});

const Divider = styled(Box)(({ theme }) => ({
  flex: "1",
  height: "1px",
  backgroundColor: theme.palette.divider,
}));

export default function Signup() {
  const { appContent } = useContext(AppContext);

  return (
    <Stack
      direction={"column"}
      width={"100%"}
      alignItems={"center"}
      p={"2rem 1rem"}
      gap={"20px"}
    >
      <Typography variant="h6" color="primary">
        {appContent.signupPage.title}
      </Typography>
      <Button
        variant="outlined"
        color="secondary"
        sx={{
          width: "100%",
          maxWidth: "450px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          padding: "8px 0px",
        }}
        component={Link}
        to="/signUpForm"
      >
        <EmailIcon />
        <Typography variant="body1" color="secondary">
          {appContent.signupPage.signUpEmail}
        </Typography>
      </Button>
      <Box
        width={"100%"}
        maxWidth={"550px"}
        display={"flex"}
        alignItems={"center"}
      >
        <Divider />
        <Typography variant="subtitle1" px={"10px"} color="secondary">
          {appContent.signupPage.alternative}
        </Typography>
        <Divider />
      </Box>
      <Box width={"100%"} maxWidth={"450px"} display={"flex"} gap={"5px"}>
        <StyledButton sx={{ flex: "1" }} variant="outlined">
          <FacebookIcon />
          <Typography variant="body1" color="secondary">
            {appContent.signupPage.facebook}
          </Typography>
        </StyledButton>
        <StyledButton sx={{ flex: "1" }} variant="outlined">
          <GoogleIcon />
          <Typography variant="body1" color="secondary">
            {appContent.signupPage.google}
          </Typography>
        </StyledButton>
      </Box>
      <Button
        variant="text"
        color="primary"
        sx={{ fontFamily: "Source Code Pro" }}
        component={Link}
        to="/login"
      >
        {appContent.signupPage.login}
      </Button>
      <Box width={"100%"} maxWidth={"550px"}>
        <Divider />
      </Box>
      <Box
        width={"100%"}
        maxWidth={"550px"}
        display={"flex"}
        flexDirection={"column"}
        gap={"5px"}
        textAlign={"center"}
      >
        <Typography variant="body1" color="secondary">
          {appContent.signupPage.legality}
        </Typography>
        <Typography variant="body1" color="secondary">
          <Button
            variant="text"
            color="secondary"
            component="a"
            href="https://www.nisekocentral.com/terms-and-conditions"
          >
            {appContent.signupPage.terms}
          </Button>
          &
          <Button
            variant="text"
            color="secondary"
            component="a"
            href="https://www.nisekocentral.com/privacy-policy"
          >
            {appContent.signupPage.privacy}
          </Button>
        </Typography>
      </Box>
    </Stack>
  );
}
