import {
  Button,
  CircularProgress,
  Stack,
  styled,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useReducer, useState } from "react";
import { AppContext } from "../utils/context";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import type { TBooking } from "../utils/types";
import useMessage from "../hooks/useMessage";
import { bookingSchema } from "../utils/schema";

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "danger",
})(({ theme }) => ({
  maxWidth: "450px",
  width: "100%",
  color: theme.palette.secondary.main,
}));

const initialState: TBooking = {
  title: "",
  category: "",
  type_one: "",
  type_two: "",
  floorSize: 10,
  lifts: 100,
  villageDistance: 100,
  view: "",
  rawImages: "",
  maxPax: 1,
  amenities: "",
  desc: "",
  pricePerNight: 10,
};

type TAction = {
  type: keyof TBooking | "reset";
  payload: string | number;
};

const reducer = (state: TBooking, action: TAction): TBooking => {
  if (action.type in state) {
    return { ...state, [action.type]: action.payload };
  }
  if (action.type === "reset") {
    return initialState;
  }
  return { ...state };
};

export default function AddBooking() {
  const { appContent, lang } = useContext(AppContext);
  const theme = useTheme();
  const [bookingElements, setBookingElements] = useReducer(
    reducer,
    initialState
  );
  const [loading, setLoading] = useState<boolean>(false);
  const { message, setMessage } = useMessage(2000);

  const addNewBooking = async () => {
    setLoading(true);
    try {
      for (let key in bookingElements) {
        if (key !== "view" && !bookingElements[key as keyof TBooking]) {
          console.log(key === "view");
          setMessage("Fill all element");
          return;
        }
      }
      const verification = bookingSchema.safeParse(bookingElements);
      if (!verification.success) {
        setMessage("Invalid booking format");
        return;
      }
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...bookingElements,
          lang,
          rawImages: bookingElements.rawImages
            .split(/[,\n]/)
            .filter((element) => element !== ""),
          amenities: bookingElements.amenities
            .split(/[,\n]/)
            .filter((element) => element !== ""),
        }),
      };
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/newBooking`,
        options
      );
      if (!response.ok) {
        setMessage("Something went wrong, try again later");
      }
      const data = await response.json();
      setMessage(data.message);
      setBookingElements({ type: "reset", payload: "" });
    } catch (err) {
      setMessage(err as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      direction={"column"}
      width={"100%"}
      p={"2rem"}
      gap={"0.5rem"}
      alignItems={"center"}
    >
      <StyledTextField
        label={appContent.addBooking.title}
        size="small"
        value={bookingElements.title}
        onChange={(e) =>
          setBookingElements({ type: "title", payload: e.target.value })
        }
      />
      <StyledTextField
        label={appContent.addBooking.category}
        size="small"
        value={bookingElements.category}
        onChange={(e) =>
          setBookingElements({ type: "category", payload: e.target.value })
        }
      />
      <StyledTextField
        label={appContent.addBooking.type_one}
        size="small"
        value={bookingElements.type_one}
        onChange={(e) =>
          setBookingElements({ type: "type_one", payload: e.target.value })
        }
      />
      <StyledTextField
        label={appContent.addBooking.type_two}
        size="small"
        value={bookingElements.type_two}
        onChange={(e) =>
          setBookingElements({ type: "type_two", payload: e.target.value })
        }
      />
      <StyledTextField
        type="number"
        label={appContent.addBooking.floorSize}
        size="small"
        value={bookingElements.floorSize}
        onChange={(e) =>
          setBookingElements({
            type: "floorSize",
            payload: Number(e.target.value),
          })
        }
      />
      <StyledTextField
        type="number"
        label={appContent.addBooking.lifts}
        size="small"
        value={bookingElements.lifts}
        onChange={(e) =>
          setBookingElements({
            type: "lifts",
            payload: Number(e.target.value),
          })
        }
      />
      <StyledTextField
        type="number"
        label={appContent.addBooking.villageDistance}
        size="small"
        value={bookingElements.villageDistance}
        onChange={(e) =>
          setBookingElements({
            type: "villageDistance",
            payload: Number(e.target.value),
          })
        }
      />
      <StyledTextField
        label={appContent.addBooking.view}
        size="small"
        value={bookingElements.view}
        onChange={(e) =>
          setBookingElements({
            type: "view",
            payload: e.target.value,
          })
        }
      />
      <StyledTextField
        type="message"
        label={appContent.addBooking.rawImages}
        minRows={5}
        multiline
        size="small"
        value={bookingElements.rawImages}
        onChange={(e) =>
          setBookingElements({
            type: "rawImages",
            payload: e.target.value,
          })
        }
      />
      <StyledTextField
        type="number"
        label={appContent.addBooking.maxPax}
        value={bookingElements.maxPax}
        onChange={(e) =>
          setBookingElements({
            type: "maxPax",
            payload: Number(e.target.value),
          })
        }
      />
      <StyledTextField
        type="message"
        label={appContent.addBooking.amenities}
        minRows={3}
        multiline
        size="small"
        value={bookingElements.amenities}
        onChange={(e) =>
          setBookingElements({
            type: "amenities",
            payload: e.target.value,
          })
        }
      />
      <StyledTextField
        type="number"
        label={appContent.addBooking.pricePerNight}
        value={bookingElements.pricePerNight}
        onChange={(e) =>
          setBookingElements({
            type: "pricePerNight",
            payload: Number(e.target.value),
          })
        }
      />
      <ReactQuill
        theme="snow"
        placeholder={appContent.addBooking.desc}
        style={{
          width: "100%",
          maxWidth: "950px",
          minHeight: "500px",
          color: theme.palette.primary.main,
        }}
        value={bookingElements.desc}
        onChange={(e) =>
          setBookingElements({
            type: "desc",
            payload: e,
          })
        }
      />
      {loading ? (
        <CircularProgress sx={{ marginTop: { md: "4rem", xs: "5rem" } }} />
      ) : (
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginTop: { md: "4rem", xs: "5rem" } }}
          onClick={addNewBooking}
        >
          {appContent.addBooking.submit}
        </Button>
      )}
      {message && (
        <Typography variant="h6" color="error">
          {message}
        </Typography>
      )}
    </Stack>
  );
}
