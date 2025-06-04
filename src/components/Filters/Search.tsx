import { Box, Button, FormLabel, TextField } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../utils/context";
import * as wanakana from "wanakana";

type TSearch = {
  setSearchFilter: React.Dispatch<React.SetStateAction<string>>;
  searchFilter: string;
};

export default function Search({ setSearchFilter, searchFilter }: TSearch) {
  const { appContent } = useContext(AppContext);
  const { lang } = useContext(AppContext);

  return (
    <>
      <Box display={"flex"} flexDirection={"column"} gap={"4px"}>
        <FormLabel>{appContent.find_accomodation_label}</FormLabel>
        <TextField
          variant="outlined"
          color="secondary"
          size="small"
          placeholder={appContent.accomodation_placeholder}
          value={
            lang === "jp"
              ? wanakana.toKana(searchFilter, { IMEMode: true })
              : searchFilter
          }
          onChange={(e) => setSearchFilter(e.target.value)}
        />
      </Box>
      <Button
        variant="contained"
        color="secondary"
        sx={{ alignSelf: "flex-end", px: "3rem" }}
      >
        Search
      </Button>
    </>
  );
}
