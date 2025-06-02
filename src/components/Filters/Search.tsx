import { Box, Button, FormLabel, TextField } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../utils/context";

export default function Search() {
  const { appContent } = useContext(AppContext);
  return (
    <>
      <Box display={"flex"} flexDirection={"column"} gap={"4px"}>
        <FormLabel>{appContent.find_accomodation_label}</FormLabel>
        <TextField
          variant="outlined"
          color="secondary"
          size="small"
          placeholder={appContent.accomodation_placeholder}
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
