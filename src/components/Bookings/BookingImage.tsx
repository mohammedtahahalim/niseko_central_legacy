import { Box, Button } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { AppContext } from "../../utils/context";
import FloorPlan from "./FloorPlan";

type TBookingImage = {
  setSeeMore: React.Dispatch<React.SetStateAction<boolean>>;
  seeMore: boolean;
};

export default function BookingImage({ setSeeMore, seeMore }: TBookingImage) {
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
        width={{ md: "100%", sm: "50%", xs: "100%" }}
        overflow={"hidden"}
        alignSelf={"center"}
        sx={{ aspectRatio: "3/4" }}
      >
        <img
          src={`${Math.floor(Math.random() * 7 + 1)}.jpg`}
          alt=""
          width={"100%"}
          height={"100%"}
          style={{ borderRadius: "12px" }}
        />
      </Box>
      <Box
        display={"flex"}
        width={{ md: "100%", sm: "50%", xs: "100%" }}
        justifyContent={"space-between"}
        alignSelf={"center"}
        px={"0.5rem"}
      >
        <Button
          variant="text"
          color="secondary"
          size="small"
          onClick={() => setSeeMore(true)}
        >
          {seeMore
            ? appContent.booking_card.see_less
            : appContent.booking_card.see_more}
        </Button>
        <Button
          variant="text"
          color="secondary"
          size="small"
          onClick={() => setFloorPlan(true)}
          ref={floorButtonRef}
        >
          {appContent.booking_card.floor_plan}
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
