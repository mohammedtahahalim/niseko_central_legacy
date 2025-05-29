import { useContext } from "react";
import { AppContext } from "../../utils/context";
import { Stack } from "@mui/material";

export default function MainHeader() {
  const { currentTheme } = useContext(AppContext);
  return (
    <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
      <img
        src={
          currentTheme === "light"
            ? "/src/assets/logo_light.png"
            : "/src/assets/logo_dark.png"
        }
        alt=""
      />
    </Stack>
  );
}
