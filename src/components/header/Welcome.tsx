import { useContext } from "react";
import { AppContext } from "../../utils/context";
import { Stack, Typography, useTheme } from "@mui/material";
import Logo from "../Logo";

export default function Welcome() {
  const { appContent } = useContext(AppContext);
  const theme = useTheme();
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{
        justifyContent: { xs: "center", sm: "space-between" },
        alignItems: "center",
      }}
      px={"2rem"}
      py={"1rem"}
      borderBottom={{ md: "none", xs: `1px solid ${theme.palette.divider}` }}
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
