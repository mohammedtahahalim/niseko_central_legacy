import { Box } from "@mui/material";
import { styled } from "@mui/material";
import { useEffect, useRef } from "react";

const StyledFloorPlan = styled(Box, {
  shouldForwardProp: (prop) => prop !== "danger",
})(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  position: "fixed",
  top: "50vh",
  left: "50vw",
  transform: "translate3d(-50%, -50%, 0)",
  color: "black",
  zIndex: "10",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

type TFloorPlan = {
  setFloorPlan: React.Dispatch<React.SetStateAction<boolean>>;
  floorButtonRef: React.RefObject<HTMLButtonElement | null>;
};

export default function FloorPlan({
  setFloorPlan,
  floorButtonRef,
}: TFloorPlan) {
  const floorRef = useRef(null);
  useEffect(() => {
    const disableFloorPlan = (e: MouseEvent) => {
      if (
        !floorRef.current ||
        (floorRef.current as HTMLElement).contains(e.target as Node) ||
        (floorButtonRef.current as HTMLElement).contains(e.target as Node)
      )
        return;
      setFloorPlan(false);
    };
    document.addEventListener("click", disableFloorPlan);
    return () => {
      document.removeEventListener("click", disableFloorPlan);
    };
  }, []);

  return (
    <StyledFloorPlan ref={floorRef}>
      <img src="floor.png" alt="floor plan" width={"100%"} />
    </StyledFloorPlan>
  );
}
