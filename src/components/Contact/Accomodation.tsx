import {
  Box,
  FormControl,
  MenuItem,
  Select,
  styled,
  TextField,
  InputLabel,
  Button,
  FormLabel,
  FormGroup,
  Checkbox,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useContext, useEffect, useReducer, useState } from "react";
import { AppContext } from "../../utils/context";
import type { IContactState, TContactAction } from "../../utils/types";
import emailjs from "@emailjs/browser";

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "danger",
})({
  maxWidth: "45ch",
});

const StyledForm = styled("form", {
  shouldForwardProp: (prop) => prop !== "danger",
})({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  maxWidth: "750px",
});

const reducer = (state: IContactState, action: TContactAction) => {
  if (action.type in state) {
    return {
      ...state,
      [action.type]: action.payload,
    };
  }
  return state;
};

const initialState: IContactState = {
  firstName: "",
  lastName: "",
  email: "",
  country: "",
  phoneNumber: "",
  flexible: "no",
  nights: 0,
  adults: 0,
  children: 0,
  infants: 0,
  interest: new Set(),
  message: "",
};

export default function Accomodation() {
  const { appContent, lang } = useContext(AppContext);
  const [formElements, dispatch] = useReducer(reducer, initialState);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [fallbackMessage, setFallBackMessage] = useState<string>("");

  const sendInquiry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingState(true);
    const message = `
      From: ${formElements.firstName} ${formElements.lastName}
      Email: ${formElements.email}
      Phone Number: ${formElements.phoneNumber}
      Country: ${formElements.country}
      Flexible Dates: ${formElements.flexible}
      Duration Stay: ${formElements.nights}
      Guests: ${formElements.adults} Adults, ${
      formElements.children
    } Children, ${formElements.infants} Infants
      Interests: ${[...(formElements.interest ?? new Set())].join(", ")}
      Message: ${formElements.message}
    `;
    try {
      emailjs
        .send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          { message },
          {
            publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
          }
        )
        .then(() => {
          setFallBackMessage("Message Sent Successfully ...");
        })
        .catch((err) => {
          setFallBackMessage(err);
        });
    } catch (err) {
      setFallBackMessage(err as string);
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setFallBackMessage("");
    }, 3500);
  }, [fallbackMessage]);

  return (
    <StyledForm onSubmit={sendInquiry}>
      <Box display={"flex"} gap={"10px"}>
        <TextField
          type="text"
          color="secondary"
          label={appContent.contact.contact_details.first}
          value={formElements.firstName}
          onChange={(e) =>
            dispatch({ type: "firstName", payload: e.target.value })
          }
          size="small"
          InputLabelProps={{
            sx: {
              px: 1,
            },
          }}
        />
        <TextField
          type="text"
          color="secondary"
          label={appContent.contact.contact_details.last}
          value={formElements.lastName}
          onChange={(e) =>
            dispatch({ type: "lastName", payload: e.target.value })
          }
          size="small"
          InputLabelProps={{
            sx: {
              px: 1,
            },
          }}
        />
      </Box>
      <StyledTextField
        type="email"
        label={appContent.contact.contact_details.email}
        color="secondary"
        size="small"
        value={formElements.email}
        onChange={(e) => dispatch({ type: "email", payload: e.target.value })}
        InputLabelProps={{
          sx: {
            px: 1,
          },
        }}
      />
      <FormControl size="small">
        <InputLabel
          id="country-label"
          sx={{
            px: 1,
          }}
        >
          {appContent.contact.contact_details.country}
        </InputLabel>
        <Select
          value={formElements.country}
          label={appContent.contact.contact_details.country}
          sx={{ maxWidth: "25ch" }}
          color="secondary"
          onChange={(e) =>
            dispatch({ type: "country", payload: e.target.value })
          }
          labelId="country-label"
        >
          {(appContent.contact.contact_details.countries_list as string[]).map(
            (element, idx) => {
              return (
                <MenuItem key={idx} value={element}>
                  {element}
                </MenuItem>
              );
            }
          )}
        </Select>
      </FormControl>
      <TextField
        type="number"
        color="secondary"
        label={appContent.contact.contact_details.phone}
        value={formElements.phoneNumber}
        onChange={(e) =>
          dispatch({ type: "phoneNumber", payload: e.target.value })
        }
        size="small"
        sx={{ maxWidth: "30ch" }}
        InputLabelProps={{
          sx: {
            px: 1,
          },
        }}
      />
      <FormControl>
        <Typography variant="body1">
          {appContent.contact.contact_details.flexible}
        </Typography>
        <RadioGroup
          row
          value={formElements.flexible === "yes" ? "yes" : "no"}
          onChange={(e) =>
            dispatch({
              type: "flexible",
              payload: e.target.value === "yes" ? "yes" : "no",
            })
          }
        >
          <FormControlLabel
            value="yes"
            control={<Radio color="secondary" />}
            label={lang === "en" ? "Yes" : "はい"}
          />
          <FormControlLabel
            value="no"
            control={<Radio color="secondary" />}
            label={lang === "en" ? "No" : "いいえ"}
          />
        </RadioGroup>
      </FormControl>
      <Box
        display={"flex"}
        flexDirection={{ md: "row", xs: "column" }}
        gap={"10px"}
        sx={{ "& > *": { flex: "1" } }}
        maxWidth={"550px"}
      >
        <FormControl size="small">
          <InputLabel
            id="nights-label"
            sx={{
              px: 1,
            }}
          >
            {appContent.contact.contact_details.nights_title}
          </InputLabel>
          <Select
            value={formElements.nights || ""}
            sx={{ maxWidth: "30ch" }}
            color="secondary"
            onChange={(e) =>
              dispatch({ type: "nights", payload: e.target.value || 0 })
            }
            labelId="nights-label"
          >
            {Array.from({ length: 15 }).map((_, idx) => {
              return (
                <MenuItem key={idx} value={idx + 1}>
                  {idx + 1}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl size="small">
          <InputLabel
            id="adults-label"
            sx={{
              px: 1,
            }}
          >
            {appContent.contact.contact_details.adults_title}
          </InputLabel>
          <Select
            value={formElements.adults || ""}
            sx={{ maxWidth: "30ch" }}
            color="secondary"
            onChange={(e) =>
              dispatch({ type: "adults", payload: e.target.value || 0 })
            }
            labelId="adults-label"
          >
            {Array.from({ length: 15 }).map((_, idx) => {
              return (
                <MenuItem key={idx} value={idx + 1}>
                  {idx + 1}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Box
        display={"flex"}
        flexDirection={{ md: "row", xs: "column" }}
        gap={"10px"}
        sx={{ "& > *": { flex: "1" } }}
        maxWidth={"550px"}
      >
        <FormControl size="small">
          <InputLabel
            id="children-label"
            sx={{
              px: 1,
            }}
          >
            {appContent.contact.contact_details.children_title}
          </InputLabel>
          <Select
            value={formElements.children || ""}
            sx={{ maxWidth: "30ch" }}
            color="secondary"
            onChange={(e) =>
              dispatch({ type: "children", payload: e.target.value || 0 })
            }
            labelId="children-label"
          >
            {Array.from({ length: 15 }).map((_, idx) => {
              return (
                <MenuItem key={idx} value={idx + 1}>
                  {idx + 1}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl size="small">
          <InputLabel
            id="infants-label"
            sx={{
              px: 1,
            }}
          >
            {appContent.contact.contact_details.infants_title}
          </InputLabel>
          <Select
            value={formElements.infants || ""}
            sx={{ maxWidth: "30ch" }}
            color="secondary"
            onChange={(e) =>
              dispatch({ type: "infants", payload: e.target.value || 0 })
            }
            labelId="infants-label"
          >
            {Array.from({ length: 15 }).map((_, idx) => {
              return (
                <MenuItem key={idx} value={idx + 1}>
                  {idx + 1}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <FormControl>
        <FormLabel>{appContent.contact.contact_details.properties}</FormLabel>
        <FormGroup
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {(appContent.contact.contact_details.all_properties as string[]).map(
            (element) => {
              return (
                <Box
                  width={"fit-content"}
                  minWidth={{ md: "225px", xs: "75px" }}
                  key={element}
                >
                  <Checkbox
                    onChange={(e) => {
                      if (
                        element === "All Properties" ||
                        element === "すべての物件"
                      ) {
                        if (e.target.checked) {
                          dispatch({
                            type: "interest",
                            payload: new Set(
                              appContent.contact.contact_details.all_properties
                            ),
                          });
                        } else {
                          dispatch({ type: "interest", payload: new Set() });
                        }
                        return;
                      }
                      const newInterest = new Set(formElements.interest ?? []);
                      if (e.target.checked) {
                        newInterest.add(element);
                      } else {
                        newInterest.delete(element);
                      }
                      dispatch({
                        type: "interest",
                        payload: newInterest,
                      });
                    }}
                    checked={formElements.interest?.has(element) ?? false}
                    size="small"
                  />
                  <FormLabel
                    id={element}
                    color={
                      formElements.interest?.has(element)
                        ? "secondary"
                        : "primary"
                    }
                    sx={{ fontSize: "0.8rem" }}
                  >
                    {element}
                  </FormLabel>
                </Box>
              );
            }
          )}
        </FormGroup>
      </FormControl>
      <TextField
        type="message"
        multiline
        rows={5}
        color="secondary"
        label={appContent.contact.contact_details.message as string}
        sx={{ maxWidth: "75ch" }}
        onChange={(e) => dispatch({ type: "message", payload: e.target.value })}
        InputLabelProps={{
          sx: {
            backgroundColor: "background.default",
            px: 1,
          },
        }}
      />
      {loadingState ? (
        <CircularProgress />
      ) : (
        <Button
          sx={{ maxWidth: "fit-content" }}
          variant="contained"
          color="secondary"
          type="submit"
          disabled={loadingState}
        >
          {appContent.contact.contact_details.submit}
        </Button>
      )}
      {fallbackMessage && (
        <Typography
          variant="body1"
          color={
            fallbackMessage === "Message Sent Successfully ..."
              ? "success"
              : "error"
          }
        >
          {fallbackMessage}
        </Typography>
      )}
    </StyledForm>
  );
}
