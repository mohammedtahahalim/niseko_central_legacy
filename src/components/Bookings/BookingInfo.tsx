import { Box, Stack, Typography, Button, Skeleton } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { AppContext } from "../../utils/context";
import FloorPlan from "./FloorPlan";

interface BookingInfoProps {
  seeMore: boolean;
  setSeeMore: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BookingInfo({ setSeeMore, seeMore }: BookingInfoProps) {
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
          Youtei Tracks 301a
        </Typography>
      )}
      {loading ? (
        <Skeleton variant="text" />
      ) : (
        <Typography variant="subtitle2" fontWeight={"200"} color="secondary">
          Youtei Tracks
        </Typography>
      )}
      <Box display={"flex"} flexDirection={"column"} gap={"0px"}>
        {loading ? (
          <Skeleton variant="text" />
        ) : (
          <Typography variant="body2" fontWeight={"800"} color="secondary">
            1 Bedroom, 2 Beds
          </Typography>
        )}
        {loading ? (
          <Skeleton variant="text" />
        ) : (
          <Typography variant="body2" fontWeight={"800"} color="secondary">
            1 Bathroom, Full Kitchen
          </Typography>
        )}
      </Box>
      <Box display={"flex"} flexDirection={"column"} gap={"0px"}>
        {loading ? (
          <Skeleton variant="text" />
        ) : (
          <Typography variant="subtitle2" fontWeight={"200"} color="secondary">
            Floor size: 56 sqm
          </Typography>
        )}
        {loading ? (
          <Skeleton variant="text" />
        ) : (
          <Typography variant="subtitle2" fontWeight={"200"} color="secondary">
            Lifts within 600m
          </Typography>
        )}
        {loading ? (
          <Skeleton variant="text" />
        ) : (
          <Typography variant="subtitle2" fontWeight={"200"} color="secondary">
            Village Centre within 300m
          </Typography>
        )}
        {loading ? (
          <Skeleton variant="text" />
        ) : (
          <Typography variant="subtitle2" fontWeight={"200"} color="secondary">
            Mt Yotei View
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
