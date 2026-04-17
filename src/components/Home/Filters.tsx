import { Box, Button, styled } from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../../utils/context";
import DurationAndQuantity from "../Filters/DurationAndQuantity";
import PriceAndType from "../Filters/PriceAndType";
import Search from "../Filters/Search";

const FiltersWrapper = styled(Box)({
  minWidth: "350px",
  display: "flex",
  flexDirection: "column",
});

export default function Filters() {
  const { appContent } = useContext(AppContext);
  const [showFilters, setShowFilters] = useState<boolean>(
    window.innerWidth > 1200,
  );
  const [durationStay, setDurationStay] = useState<number>(1);

  return (
    <FiltersWrapper
      sx={{
        width: { lg: "35%", xs: "100%" },
        display: "flex",
        flexDirection: "column",
        padding: "0rem 0.5rem",
      }}
    >
      <Box display={{ lg: "none", xs: "flex" }} alignSelf={"center"}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setShowFilters((showFilters) => !showFilters)}
        >
          {appContent.stay_dates_and_filters}
        </Button>
      </Box>
      {showFilters && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <DurationAndQuantity
            durationStay={durationStay}
            setDurationStay={setDurationStay}
          />
          <PriceAndType />
          <Search />
        </Box>
      )}
    </FiltersWrapper>
  );
}
