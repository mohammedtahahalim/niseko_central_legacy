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
} from "@mui/material";
import { useContext, useReducer } from "react";
import { AppContext } from "../../utils/context";
import type { IContactState, TContactAction } from "../../utils/types";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "danger",
})({
  width: "45ch",
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
  date: "",
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

  const sendInquiry = () => {
    console.log(formElements);
  };

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
        />
        <TextField
          type="text"
          color="secondary"
          label={appContent.contact.contact_details.last}
          value={formElements.lastName}
          onChange={(e) =>
            dispatch({ type: "lastName", payload: e.target.value })
          }
        />
      </Box>
      <StyledTextField
        type="email"
        label={appContent.contact.contact_details.email}
        color="secondary"
        value={formElements.email}
        onChange={(e) => dispatch({ type: "email", payload: e.target.value })}
      />
      <FormControl>
        <InputLabel id="country-label">
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
        sx={{ maxWidth: "20ch" }}
      />
      <DatePicker
        label={appContent.contact.contact_details.select_date}
        value={dayjs(formElements.date || new Date().getTime())}
        sx={{ maxWidth: "25ch" }}
        onChange={(e) =>
          dispatch({ type: "date", payload: e ? e.format("YYYY-MM-DD") : "" })
        }
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
      <FormControl>
        <InputLabel id="nights-label">
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
      <FormControl>
        <InputLabel id="adults-label">
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
      <FormControl>
        <InputLabel id="children-label">
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
      <FormControl>
        <InputLabel id="infants-label">
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
                  />
                  <FormLabel
                    id={element}
                    color={
                      formElements.interest?.has(element)
                        ? "secondary"
                        : "primary"
                    }
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
      />
      <Button
        sx={{ maxWidth: "fit-content" }}
        variant="contained"
        color="secondary"
        onClick={sendInquiry}
      >
        {appContent.contact.contact_details.submit}
      </Button>
    </StyledForm>
  );
}
