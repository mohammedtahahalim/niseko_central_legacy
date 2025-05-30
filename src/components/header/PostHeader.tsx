import { Button, Stack } from "@mui/material";
import SocialMedia from "../SocialMedia";
import { useContext } from "react";
import { AppContext } from "../../utils/context";
import { Link, useLocation } from "react-router-dom";

export default function PostHeader() {
  const { appContent } = useContext(AppContext);
  const currentLocation = useLocation().pathname;

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
              component={Link}
              to={element[1]}
              key={element[0]}
              color={currentLocation === element[1] ? "secondary" : "primary"}
              variant={currentLocation === element[1] ? "outlined" : "text"}
            >
              {element[0]}
            </Button>
          ))}
      </Stack>
      <SocialMedia />
    </Stack>
  );
}
