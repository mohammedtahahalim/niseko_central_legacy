import { Box, Button, FormLabel, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import { AppContext } from "../../utils/context";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { convertIntoDays } from "../../utils/helpers";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const StyledDatePicker = styled(DatePicker, {
  shouldForwardProp: (prop) => prop !== "danger",
})(() => ({
  borderRadius: 4,
  overflow: "hidden",
  flex: "1",
  "& > *": {
    height: "40px",
  },
}));

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "danger",
})(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.main}`,
  scale: "0.8",
}));

export default function DurationAndQuantity() {
  const { appContent } = useContext(AppContext);
  const [startDate, setStartDate] = useState<number>(new Date().getTime());
  const [durationStay, setDurationStay] = useState<number>(1);
  const [guests, setGuests] = useState<number[]>([1, 0, 0]);
  const [controlNights, setControlNights] = useState<boolean>(false);
  const [controlGuests, setControlGuests] = useState<boolean>(false);

  return (
    <>
      <Box width={"100%"} display={"flex"} flexDirection={"column"} gap={"4px"}>
        <FormLabel>{appContent.stay_label}</FormLabel>
        <Box display={"flex"} overflow={"hidden"} gap={"5px"}>
          <StyledDatePicker
            value={dayjs(startDate)}
            minDate={dayjs(startDate)}
            onChange={(e) =>
              setStartDate(
                e ? Math.max(e.valueOf(), new Date().getTime()) : startDate
              )
            }
          />
          <StyledDatePicker
            value={dayjs(startDate + durationStay * 86400000)}
            minDate={dayjs(startDate + 86400000)}
            onChange={(e) =>
              setDurationStay(convertIntoDays((e?.valueOf() || 0) - startDate))
            }
          />
        </Box>
      </Box>
      <Box width={"100%"} display={"flex"} flexDirection={"column"} gap={"4px"}>
        <FormLabel>{appContent.nights}</FormLabel>
        <Button
          variant="outlined"
          sx={{ height: "40px" }}
          onClick={() => setControlNights(!controlNights)}
        >{`${durationStay} ${appContent.nights}`}</Button>
        {controlNights && (
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <FormLabel>{`${durationStay} ${appContent.nights}`}</FormLabel>
            <Box display={"flex"}>
              <StyledIconButton
                onClick={() => setDurationStay(Math.max(durationStay - 1, 1))}
              >
                <RemoveIcon color="secondary" />
              </StyledIconButton>
              <StyledIconButton
                onClick={() => setDurationStay(durationStay + 1)}
              >
                <AddIcon fontSize="small" color="secondary" />
              </StyledIconButton>
            </Box>
          </Box>
        )}
      </Box>
      <Box width={"100%"} display={"flex"} flexDirection={"column"} gap={"4px"}>
        <FormLabel>{appContent.guests}</FormLabel>
        <Button
          variant="outlined"
          sx={{ height: "40px" }}
          onClick={() => setControlGuests(!controlGuests)}
        >{`${guests[0]} ${appContent.adults} ${
          guests[1] ? `,${guests[1]} ${appContent.children}` : ""
        }${guests[2] ? `,${guests[2]} ${appContent.infants}` : ""}`}</Button>
        {controlGuests && (
          <>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <FormLabel>{`${guests[0]} ${appContent.adults}`}</FormLabel>
              <Box display={"flex"}>
                <StyledIconButton
                  onClick={() =>
                    setGuests([
                      Math.max(guests[0] - 1, 1),
                      guests[1],
                      guests[2],
                    ])
                  }
                >
                  <RemoveIcon color="secondary" />
                </StyledIconButton>
                <StyledIconButton
                  onClick={() =>
                    setGuests([Math.max(guests[0] + 1), guests[1], guests[2]])
                  }
                >
                  <AddIcon fontSize="small" color="secondary" />
                </StyledIconButton>
              </Box>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <FormLabel>{`${guests[1]} ${appContent.children}`}</FormLabel>
              <Box display={"flex"}>
                <StyledIconButton
                  onClick={() =>
                    setGuests([
                      guests[0],
                      Math.max(guests[1] - 1, 0),
                      guests[2],
                    ])
                  }
                >
                  <RemoveIcon color="secondary" />
                </StyledIconButton>
                <StyledIconButton
                  onClick={() =>
                    setGuests([guests[0], Math.max(guests[1] + 1), guests[2]])
                  }
                >
                  <AddIcon fontSize="small" color="secondary" />
                </StyledIconButton>
              </Box>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <FormLabel>{`${guests[2]} ${appContent.infants}`}</FormLabel>
              <Box display={"flex"}>
                <StyledIconButton
                  onClick={() =>
                    setGuests([
                      guests[0],
                      guests[1],
                      Math.max(guests[2] - 1, 0),
                    ])
                  }
                >
                  <RemoveIcon color="secondary" />
                </StyledIconButton>
                <StyledIconButton
                  onClick={() =>
                    setGuests([guests[0], guests[1], Math.max(guests[2] + 1)])
                  }
                >
                  <AddIcon fontSize="small" color="secondary" />
                </StyledIconButton>
              </Box>
            </Box>
          </>
        )}
      </Box>
      <Button
        variant="contained"
        color="secondary"
        sx={{ width: "fit-content", alignSelf: "flex-end", px: "3rem" }}
      >
        Search
      </Button>
    </>
  );
}
