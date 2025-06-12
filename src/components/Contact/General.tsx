import {
  Box,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../utils/context";

export default function General() {
  const { appContent } = useContext(AppContext);
  return (
    <FormControl sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <Box
        display={"flex"}
        gap={"10px"}
        flexDirection={{ sm: "row", xs: "column" }}
      >
        <TextField
          variant="outlined"
          label={appContent.contact.contact_details.first}
          type="text"
        />
        <TextField
          variant="outlined"
          label={appContent.contact.contact_details.last}
          type="text"
        />
      </Box>
      <Typography>
        <FormLabel>
          {appContent.contact.contact_details.please_check[0]}
        </FormLabel>
      </Typography>
    </FormControl>
  );
}
