import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { useContext, useState } from "react";
import { AppContext } from "../utils/context";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../utils/schema";

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
const StyledForm = styled("form", {
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
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigator = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("All fields are required");
      return;
    }
    if (!loginSchema.safeParse({ email, password }).success) {
      setError("Bad format");
      return;
    }
    const controller = new AbortController();
    try {
      setLoading(true);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include" as RequestCredentials,
        signal: controller.signal,
      };
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        options
      );
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        return;
      }
      navigator("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
    return () => {
      controller.abort();
    };
  };

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
      <StyledForm onSubmit={handleSubmit}>
        <TextField
          type="email"
          size="small"
          label={appContent.loginPage.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          size="small"
          label={appContent.loginPage.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {loading ? (
          <CircularProgress sx={{ alignSelf: "center" }} />
        ) : (
          <Button variant="contained" color="secondary" type="submit">
            {appContent.loginPage.login}
          </Button>
        )}
        {error && (
          <Typography variant="h6" color="error" fontSize={"0.9rem"}>
            {error}
          </Typography>
        )}
      </StyledForm>
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
