import { Box, Button } from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { useContext, useRef, useState } from "react";
import { AppContext } from "../../utils/context";
import FloorPlan from "./FloorPlan";

type TBookingImage = {
  setSeeMore: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function BookingImage({ setSeeMore }: TBookingImage) {
  const { appContent } = useContext(AppContext);
  const [floorPlan, setFloorPlan] = useState<boolean>(false);
  const floorButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <Box
      width={{ md: "35%", xs: "100%" }}
      height={"100%"}
      maxHeight={"300px"}
      sx={{ aspectRatio: "1" }}
      p={"0.5rem"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Box
        width={{ md: "100%", sm: "50%", xs: "80%" }}
        overflow={"hidden"}
        alignSelf={"center"}
      >
        <img
          src="placeholder.jpg"
          alt=""
          width={"100%"}
          height={"100%"}
          style={{ borderRadius: "12px" }}
        />
      </Box>
      <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
        <Button
          variant="text"
          color="secondary"
          startIcon={<ZoomInIcon />}
          size="small"
          onClick={() => setSeeMore(true)}
        >
          {appContent.booking_card.see_more || "See More"}
        </Button>
        <Button
          variant="text"
          color="secondary"
          startIcon={<ZoomInIcon />}
          size="small"
          onClick={() => setFloorPlan(true)}
          ref={floorButtonRef}
        >
          {appContent?.booking_card.floor_plan || "Floor Plan"}
        </Button>
      </Box>
      {floorPlan && (
        <FloorPlan
          setFloorPlan={setFloorPlan}
          floorButtonRef={floorButtonRef}
        />
      )}
    </Box>
  );
}
