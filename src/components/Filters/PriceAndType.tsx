import {
  Box,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../../utils/context";
import { room_options } from "../../utils/helpers";
import { filter } from "../../utils/helpers";

interface IPriceAndType {
  durationStay: number;
}

export default function PriceAndType({ durationStay }: IPriceAndType) {
  const [price, setPrice] = useState<number>(1000000);
  const { appContent, setLoading, setFilteredContent, contents } =
    useContext(AppContext);
  const [roomType, setRoomType] = useState<string[]>([]);

  const handleRoomType = (event: SelectChangeEvent<typeof roomType>) => {
    const {
      target: { value },
    } = event;
    setRoomType(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      <Box display={"flex"} flexDirection={"column"} gap={"4px"}>
        <FormLabel>{appContent.price_range}</FormLabel>
        <TextField
          type="range"
          color="secondary"
          sx={{ "& fieldset": { border: "none" } }}
          value={price / 10000}
          onChange={(e) =>
            setPrice(Math.max(Number(e.target.value) * 10000 + 5000, 5000))
          }
        />
        <FormLabel sx={{ fontSize: "0.75rem" }} color="secondary">
          JPY 5,000 - {price}+
        </FormLabel>
      </Box>
      <Box display={"flex"} flexDirection={"column"} gap={"4px"}>
        <FormLabel>{appContent.room_type}</FormLabel>
        <Select
          multiple
          value={roomType}
          onChange={handleRoomType}
          size="small"
          defaultValue={["All Room Types"]}
        >
          {room_options.map((element, index) => {
            return (
              <MenuItem value={element} key={element}>
                {appContent.room_options[index]}
              </MenuItem>
            );
          })}
        </Select>
      </Box>
      <Button
        variant="contained"
        color="secondary"
        sx={{ alignSelf: "flex-end", px: "3rem" }}
        onClick={() => {
          setLoading(true);
          setFilteredContent(
            filter(
              "price_and_type",
              [
                durationStay.toString(),
                price.toString(),
                JSON.stringify(roomType),
              ],
              contents
            )
          );
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }}
      >
        Filter
      </Button>
    </>
  );
}
