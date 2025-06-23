import { useContext, useReducer, useState } from "react";
import { AppContext } from "../utils/context";
import {
  Box,
  Button,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { signUpSchema } from "../utils/schema";
import type { TSignUp } from "../utils/types";

const StyledBox = styled(Box)({
  width: "100%",
  maxWidth: "500px",
  display: "flex",
  flexDirection: "column",
});

const StyledUL = styled("ul")(({ theme }) => ({
  width: "100%",
  padding: "1rem 2rem",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "8px",
  "& li": {
    fontFamily: "Source Code Pro",
    fontSize: "0.85rem",
    fontStyle: "italic",
    color: theme.palette.primary.main,
  },
}));

const SignUpFormHandler = styled("form", {
  shouldForwardProp: (prop) => prop !== "danger",
})({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const initialState: TSignUp = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  repeatPassword: "",
};

type TAction = {
  type: "firstName" | "lastName" | "email" | "password" | "repeatPassword";
  payload: string;
};

const reducer = (state: TSignUp, action: TAction): TSignUp => {
  if (action.type in state) {
    return { ...state, [action.type]: action.payload };
  }
  return { ...state };
};

export default function SignUpForm() {
  const { appContent } = useContext(AppContext);
  const [formElements, setFormElements] = useReducer(reducer, initialState);
  const [error, setError] = useState<string>("");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    const verification = signUpSchema.safeParse(formElements);
    if (!verification.success) {
      setError(verification.error.errors[0].message);
      return;
    }
  };

  return (
    <Stack
      direction={"column"}
      width={"100%"}
      alignItems={"center"}
      p={"2rem 1rem"}
      gap={"20px"}
    >
      <StyledBox>
        <StyledUL>
          {appContent.signupPage.form.validation.map((list) => {
            return <li key={list}>{list}</li>;
          })}
        </StyledUL>
        <SignUpFormHandler onSubmit={handleSignUp}>
          <TextField
            label={appContent.signupPage.form.firstName}
            size="small"
            type="text"
            required
            value={formElements.firstName}
            onChange={(e) =>
              setFormElements({ type: "firstName", payload: e.target.value })
            }
          />
          <TextField
            label={appContent.signupPage.form.lastName}
            size="small"
            type="text"
            required
            value={formElements.lastName}
            onChange={(e) =>
              setFormElements({ type: "lastName", payload: e.target.value })
            }
          />
          <TextField
            label={appContent.signupPage.form.email}
            size="small"
            type="email"
            required
            value={formElements.email}
            onChange={(e) =>
              setFormElements({ type: "email", payload: e.target.value })
            }
          />
          <TextField
            label={appContent.signupPage.form.pw}
            size="small"
            type="password"
            required
            value={formElements.password}
            onChange={(e) =>
              setFormElements({ type: "password", payload: e.target.value })
            }
          />
          <TextField
            label={appContent.signupPage.form.rpPw}
            size="small"
            type="password"
            required
            value={formElements.repeatPassword}
            onChange={(e) =>
              setFormElements({
                type: "repeatPassword",
                payload: e.target.value,
              })
            }
          />
        </SignUpFormHandler>
        <Box
          sx={{
            py: "1rem",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            component={Link}
            to="/signUp"
            sx={{
              fontFamily: "Source Code Pro",
              fontSize: "0.85rem",
              fontStyle: "italic",
            }}
          >
            {appContent.signupPage.form.backButton}
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleSignUp}
            sx={{
              fontFamily: "Source Code Pro",
              fontSize: "0.85rem",
              fontStyle: "italic",
            }}
          >
            {appContent.signupPage.form.submitButton}
          </Button>
        </Box>
        {error && (
          <Typography
            variant="h6"
            color="error"
            sx={{
              fontFamily: "Source Code Pro",
              fontSize: "0.9rem",
              fontStyle: "italic",
            }}
          >
            {error}
          </Typography>
        )}
      </StyledBox>
    </Stack>
  );
}
