import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../utils/context";
import type { SxProps, Theme } from "@mui/material/styles";

interface TModifiedBox {
  children: React.ReactNode;
  variant: "primary" | "secondary";
  sx?: SxProps<Theme>;
}

const ModifiedBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "variant" && prop !== "currenttheme",
})<{
  variant: "primary" | "secondary";
  currenttheme: "light" | "dark";
}>(({ variant, currenttheme }) => ({
  backgroundColor:
    variant === "primary"
      ? currenttheme === "dark"
        ? "#121212"
        : "#FAFAFA"
      : currenttheme === "dark"
      ? "#1A1A1A"
      : "#F3F4F6",
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
