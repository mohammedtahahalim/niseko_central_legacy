import { Box, Stack, Typography, Button, Skeleton } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { AppContext } from "../../utils/context";
import FloorPlan from "./FloorPlan";

interface BookingInfoProps {
  id: number;
  SetCurrentActive: React.Dispatch<React.SetStateAction<number>>;
  currentActive: number;
  title: string;
  category: string;
  type_one: string;
  type_two: string;
  floorSize: number;
  liftWithin: number;
  villageCenter: number;
  view?: string;
}

export default function BookingInfo({
  SetCurrentActive,
  currentActive,
  title,
  category,
  type_one,
  type_two,
  floorSize,
  liftWithin,
  villageCenter,
  view,
  id,
}: BookingInfoProps) {
  const { appContent, loading } = useContext(AppContext);
  const floorButtonRef = useRef<HTMLButtonElement | null>(null);
  const [floorPlan, setFloorPlan] = useState<boolean>(false);

  return (
    <Stack
      width={{ md: "40%", xs: "100%" }}
      direction={"column"}
      gap={{ md: "5px", xs: "2px" }}
      p={{ md: "0.5rem 1rem", xs: "0rem 1rem 0.5rem" }}
    >
      {loading ? (
        <Skeleton variant="text" />
      ) : (
        <Typography variant="h6" color="secondary">
          {title}
        </Typography>
      )}
      {loading ? (
        <Skeleton variant="text" />
      ) : (
        <Typography variant="subtitle2" fontWeight={"200"} color="secondary">
          {category}
        </Typography>
      )}
      <Box display={"flex"} flexDirection={"column"} gap={"0px"}>
        {loading ? (
          <Skeleton variant="text" />
        ) : (
          <Typography variant="body2" fontWeight={"800"} color="secondary">
            {type_one}
          </Typography>
        )}
        {loading ? (
          <Skeleton variant="text" />
        ) : (
          <Typography variant="body2" fontWeight={"800"} color="secondary">
            {type_two}
          </Typography>
        )}
      </Box>
      <Box display={"flex"} flexDirection={"column"} gap={"0px"}>
        {loading ? (
          <Skeleton variant="text" />
        ) : (
          <Typography variant="subtitle2" fontWeight={"200"} color="secondary">
            {appContent.booking_card.floor_size}: {floorSize} sqm
          </Typography>
        )}
        {loading ? (
          <Skeleton variant="text" />
        ) : (
          <Typography variant="subtitle2" fontWeight={"200"} color="secondary">
            {appContent.booking_card.lifts_within}: {liftWithin}m
          </Typography>
        )}
        {loading ? (
          <Skeleton variant="text" />
        ) : (
          <Typography variant="subtitle2" fontWeight={"200"} color="secondary">
            {appContent.booking_card.village_center}: {villageCenter}m
          </Typography>
        )}
        {view && (
          <Typography variant="subtitle2" fontWeight={"200"} color="secondary">
            {view} {appContent.booking_card.view}
          </Typography>
        )}
        {!loading && (
          <Box
            display={"flex"}
            width={{ md: "100%", sm: "50%", xs: "100%" }}
            justifyContent={"space-between"}
            alignSelf={"center"}
            marginTop={"5px"}
          >
            <Button
              variant="text"
              color="secondary"
              size="small"
              onClick={() =>
                SetCurrentActive((currentActive) =>
                  currentActive !== id ? id : -1,
                )
              }
            >
              {currentActive === id
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
        )}
        {floorPlan && (
          <FloorPlan
            setFloorPlan={setFloorPlan}
            floorButtonRef={floorButtonRef}
          />
        )}
      </Box>
    </Stack>
  );
}
