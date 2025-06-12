import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useReducer, useState } from "react";
import { AppContext } from "../../utils/context";
import emailjs from "@emailjs/browser";

interface IState {
  firstName: string;
  lastName: string;
  email?: string;
  message?: string;
  phoneNumber?: string;
  emergencyPhone?: string;
}

type TAction = {
  type:
    | "firstName"
    | "lastName"
    | "email"
    | "message"
    | "phoneNumber"
    | "emergencyPhone";
  payload: string;
};

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
  phoneNumber: "",
  emergencyPhone: "",
};

const reducer = (state: IState, action: TAction) => {
  if (action.type in state) {
    return { ...state, [action.type]: action.payload };
  }
  return state;
};

export default function General() {
  const { appContent } = useContext(AppContext);
  const [inHouse, setInHouse] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [fallbackMessage, setFallBackMessage] = useState<string>("");
  const [formElements, dispatch] = useReducer(reducer, initialState);

  const sendInquiry = () => {
    const message = `
    First Name: ${formElements.firstName}
    Last Name: ${formElements.lastName}
    ${formElements.email && `Email: ${formElements.email}`}
    ${formElements.message && `Message: ${formElements.message}`}
    ${formElements.phoneNumber && `Phone Number: ${formElements.phoneNumber}`}
    ${
      formElements.emergencyPhone &&
      `Emeregency Phone Number: ${formElements.emergencyPhone}`
    }
    `;
    setLoadingState(true);
    try {
      emailjs
        .send(
          "service_gxs9l81",
          "template_p83yoeu",
          { message },
          {
            publicKey: "xRd4DEqPqBERaiCHZ",
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
    <FormControl sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Box
        display={"flex"}
        gap={"10px"}
        flexDirection={{ sm: "row", xs: "column" }}
      >
        <TextField
          variant="outlined"
          label={appContent.contact.contact_details.first}
          type="text"
          color="secondary"
          onChange={(e) =>
            dispatch({ type: "firstName", payload: e.target.value })
          }
          InputLabelProps={{
            sx: {
              backgroundColor: "background.default",
              px: 1,
            },
          }}
        />
        <TextField
          variant="outlined"
          label={appContent.contact.contact_details.last}
          type="text"
          color="secondary"
          onChange={(e) =>
            dispatch({ type: "lastName", payload: e.target.value })
          }
          InputLabelProps={{
            sx: {
              backgroundColor: "background.default",
              px: 1,
            },
          }}
        />
      </Box>
      <Typography variant="body1" color="secondary">
        {appContent.contact.contact_details.please_check[0]}
      </Typography>
      <Box display={"flex"} alignItems={"center"} gap={"5px"}>
        <Checkbox
          sx={{ p: "0" }}
          color="secondary"
          checked={inHouse}
          onChange={() => setInHouse(!inHouse)}
        />
        <FormLabel
          onClick={() => setInHouse(!inHouse)}
          sx={{ cursor: "pointer" }}
        >
          {appContent.contact.contact_details.please_check[1]}
        </FormLabel>
      </Box>
      {inHouse && (
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"10px"}
          maxWidth={"45ch"}
        >
          <TextField
            type="number"
            label={appContent.contact.contact_details.phone}
            onChange={(e) =>
              dispatch({ type: "phoneNumber", payload: e.target.value })
            }
            InputLabelProps={{
              sx: {
                backgroundColor: "background.default",
                px: 1,
              },
            }}
          />
          <TextField
            type="number"
            label={appContent.contact.contact_details.emergency_phone}
            onChange={(e) =>
              dispatch({ type: "emergencyPhone", payload: e.target.value })
            }
            InputLabelProps={{
              sx: {
                backgroundColor: "background.default",
                px: 1,
              },
            }}
          />
        </Box>
      )}
      {!inHouse && (
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"10px"}
          maxWidth={"45ch"}
        >
          <TextField
            type="email"
            label={appContent.contact.contact_details.email}
            color="secondary"
            onChange={(e) =>
              dispatch({ type: "email", payload: e.target.value })
            }
            InputLabelProps={{
              sx: {
                backgroundColor: "background.default",
                px: 1,
              },
            }}
          />
          <TextField
            type="message"
            multiline
            rows={4}
            color="secondary"
            label={appContent.contact.contact_details.message as string}
            onChange={(e) =>
              dispatch({ type: "message", payload: e.target.value })
            }
            InputLabelProps={{
              sx: {
                backgroundColor: "background.default",
                px: 1,
              },
            }}
          />
        </Box>
      )}
      {loadingState ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: "fit-content" }}
          onClick={sendInquiry}
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
    </FormControl>
  );
}
