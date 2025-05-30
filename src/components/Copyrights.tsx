import { Button, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../utils/context";

export default function Copyrights() {
  const { appContent } = useContext(AppContext);
  return (
    <Stack direction={"column"}>
      <Typography
        variant="subtitle1"
        alignItems={"center"}
        display={"flex"}
        justifyContent={"center"}
      >
        ©{new Date().getFullYear()}
        <Button
          variant="text"
          color="primary"
          size="small"
          href="https://www.htmniseko.com/"
        >
          HTM KK
        </Button>
      </Typography>
      <Typography display={"flex"}>
        <Button
          variant="text"
          color="primary"
          size="small"
          href="https://www.nisekocentral.com/terms-and-conditions"
        >
          {appContent.footer.terms}
        </Button>
        .
        <Button
          variant="text"
          color="primary"
          size="small"
          href="https://www.nisekocentral.com/privacy-policy"
        >
          {appContent.footer.privacy}
        </Button>
      </Typography>
    </Stack>
  );
}
