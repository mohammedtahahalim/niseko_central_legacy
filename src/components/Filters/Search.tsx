import { Box, Button, FormLabel, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../../utils/context";
import * as wanakana from "wanakana";

export default function Search() {
  const { appContent } = useContext(AppContext);
  const { lang } = useContext(AppContext);
  const [searchFilter, setSearchFilter] = useState<string>("");

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
          onChange={(e) => setSearchFilter(wanakana.toRomaji(e.target.value))}
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
