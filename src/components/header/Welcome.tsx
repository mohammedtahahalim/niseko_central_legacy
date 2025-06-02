import { useContext } from "react";
import { AppContext } from "../../utils/context";
import { Stack, Typography } from "@mui/material";
import Logo from "../Logo";

export default function Welcome() {
  const { appContent } = useContext(AppContext);
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{
        justifyContent: { xs: "center", sm: "space-between" },
        alignItems: "center",
      }}
      px={"2rem"}
      py={"1rem"}
    >
      <Logo />
      <Typography
        variant="subtitle1"
        textTransform={"capitalize"}
        textOverflow={"ellipsis"}
        textAlign={{ sm: "end", xs: "center" }}
        maxWidth={{ xs: "90%", sm: "40%" }}
      >
        {appContent.title.split("–")[0]}
      </Typography>
    </Stack>
  );
}
