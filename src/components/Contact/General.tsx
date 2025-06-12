import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";

import { useContext, useState } from "react";
import { AppContext } from "../../utils/context";

export default function General() {
  const { appContent } = useContext(AppContext);
  const [inHouse, setInHouse] = useState<boolean>(false);
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
        />
        <TextField
          variant="outlined"
          label={appContent.contact.contact_details.last}
          type="text"
          color="secondary"
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
          />
          <TextField
            type="number"
            label={appContent.contact.contact_details.emergency_phone}
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
          />
          <TextField
            type="message"
            multiline
            rows={4}
            color="secondary"
            label={appContent.contact.contact_details.message as string}
          />
        </Box>
      )}
      <Button
        variant="contained"
        color="secondary"
        sx={{ width: "fit-content" }}
      >
        Submit
      </Button>
    </FormControl>
  );
}
