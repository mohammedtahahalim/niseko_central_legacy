import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../utils/context";
import type { SxProps, Theme } from "@mui/material/styles";

interface TModifiedBox {
  children: React.ReactNode;
  variant: "primary" | "secondary" | "hybrid";
  sx?: SxProps<Theme>;
}

interface TModifiedBoxProps {
  variant: "primary" | "secondary" | "hybrid";
  currenttheme: "light" | "dark";
}

const ModifiedBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "variant" && prop !== "currenttheme",
})<TModifiedBoxProps>(({ variant, currenttheme }) => ({
  backgroundColor:
    variant === "primary"
      ? currenttheme === "dark"
        ? "#121212"
        : "#FAFAFA"
      : variant === "secondary"
      ? currenttheme === "dark"
        ? "#262626"
        : "#F3F4F6"
      : currenttheme === "dark"
      ? "#1C252C"
      : "#E8EEF2",
  flex: "1",
}));

export default function MuiBox({ variant, children, sx }: TModifiedBox) {
  const { currentTheme } = useContext(AppContext);
  return (
    <ModifiedBox variant={variant} currenttheme={currentTheme} sx={sx}>
      {children}
    </ModifiedBox>
  );
}
