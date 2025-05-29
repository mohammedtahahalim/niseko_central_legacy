import { Button, Stack } from "@mui/material";
import SocialMedia from "../SocialMedia";
import { useContext } from "react";
import { AppContext } from "../../utils/context";
import { Link } from "react-router-dom";

export default function SpecialMenu() {
  const { appContent } = useContext(AppContext);
  return (
    <Stack
      direction={"row"}
      justifyContent={{ md: "space-between", xs: "center" }}
      p={"0.5rem"}
    >
      <Stack direction={"row"} gap={{ md: "1rem", sm: "0.5rem" }}>
        {Array.isArray(appContent.specialMenu) &&
          appContent.specialMenu.map((element: any) => (
            <Button
              variant="text"
              component={Link}
              to={element[1]}
              key={element[0]}
            >
              {element[0]}
            </Button>
          ))}
      </Stack>
      <SocialMedia />
    </Stack>
  );
}
