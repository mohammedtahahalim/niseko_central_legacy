import { useContext } from "react";
import { AppContext } from "../../utils/context";
import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function MainHeader() {
  const { currentTheme, appContent } = useContext(AppContext);
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{
        justifyContent: { xs: "center", sm: "space-between" },
        alignItems: "center",
      }}
      px={"2rem"}
    >
      <Link to={"/"}>
        <img
          src={
            currentTheme === "light"
              ? "/src/assets/logo_light.png"
              : "/src/assets/logo_dark.png"
          }
          alt=""
        />
      </Link>
      <Typography
        variant="subtitle1"
        textTransform={"capitalize"}
        textOverflow={"ellipsis"}
        textAlign={"center"}
        maxWidth={{ xs: "90%", sm: "40%" }}
      >
        {appContent.title?.split("–")[0]}
      </Typography>
    </Stack>
  );
}
