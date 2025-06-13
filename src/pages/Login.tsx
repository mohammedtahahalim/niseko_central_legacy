import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { useContext } from "react";
import { AppContext } from "../utils/context";
import { Link } from "react-router-dom";

const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "danger",
})(({ theme }) => ({
  padding: "1.5rem",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  border: `1px solid ${theme.palette.divider}`,
  width: "100%",
  maxWidth: "500px",
}));

const Divider = styled(Box)(({ theme }) => ({
  flex: "1",
  height: "1px",
  backgroundColor: theme.palette.divider,
}));

const AuthBox = styled(Box)(({ theme }) => ({
  flex: "1",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "5px",
  border: `1px solid ${theme.palette.divider}`,
  cursor: "pointer",
  padding: "1rem 0rem",
  maxWidth: "40%",
}));

export default function Login() {
  const { appContent } = useContext(AppContext);
  return (
    <Stack
      direction={"column"}
      width={"100%"}
      p={"2rem 1rem"}
      alignItems={"center"}
      gap={"10px"}
    >
      <Typography variant="h6" color="primary">
        {appContent.loginPage.header}
      </Typography>
      <FormControlLabel
        control={<Checkbox color="secondary" />}
        label={appContent.loginPage.keepMeSigned}
      />
      <StyledBox>
        <TextField
          type="email"
          label={appContent.loginPage.email}
          size="small"
        />
        <Button variant="contained" color="secondary">
          {appContent.loginPage.loginLink}
        </Button>
      </StyledBox>
      <StyledBox>
        <TextField
          type="email"
          size="small"
          label={appContent.loginPage.email}
        />
        <TextField
          type="password"
          size="small"
          label={appContent.loginPage.password}
        />
        <Button variant="contained" color="secondary">
          {appContent.loginPage.login}
        </Button>
      </StyledBox>
      <Box
        width={"100%"}
        maxWidth={"550px"}
        display={"flex"}
        alignItems={"center"}
        gap={"8px"}
      >
        <Divider></Divider>
        <Typography variant="body1">
          {appContent.loginPage.alternative}
        </Typography>
        <Divider></Divider>
      </Box>
      <Box
        width={"80%"}
        maxWidth={"550px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"8px"}
      >
        <AuthBox>
          <FacebookIcon fontSize="small" />
          <Typography variant="body1" color="primary">
            {appContent.loginPage.facebook}
          </Typography>
        </AuthBox>
        <AuthBox>
          <GoogleIcon fontSize="small" />
          <Typography variant="body1" color="primary">
            {appContent.loginPage.google}
          </Typography>
        </AuthBox>
      </Box>
      <Button variant="text" color="secondary" component={Link} to="/signup">
        {appContent.loginPage.new}
      </Button>
      <Button
        variant="text"
        color="secondary"
        component={Link}
        to="/forgotPassword"
      >
        {appContent.loginPage.forgotPw}
      </Button>
      <Box width={"100%"} maxWidth={"550px"}>
        <Divider />
      </Box>
      <Typography variant="subtitle1" color="secondary" textAlign={"center"}>
        {appContent.loginPage.agreement}
      </Typography>
      <Box>
        <Button
          variant="text"
          color="secondary"
          component="a"
          href="https://www.nisekocentral.com/terms-and-conditions"
        >
          {appContent.loginPage.terms}
        </Button>
        {" & "}
        <Button
          variant="text"
          color="secondary"
          component="a"
          href="https://www.nisekocentral.com/privacy-policy"
        >
          {appContent.loginPage.privacy}
        </Button>
      </Box>
    </Stack>
  );
}
