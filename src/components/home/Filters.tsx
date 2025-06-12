import { Box, Button } from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../../utils/context";
import DurationAndQuantity from "../Filters/DurationAndQuantity";
import PriceAndType from "../Filters/PriceAndType";
import Search from "../Filters/Search";

export default function Filters() {
  const { appContent } = useContext(AppContext);
  const [showFilters, setShowFilters] = useState<boolean>(
    window.innerWidth > 900
  );
  const [searchFilter, setSearchFilter] = useState<string>("");

  return (
    <Box
      sx={{
        width: { md: "35%", xs: "100%" },
        display: "flex",
        flexDirection: "column",
        padding: "0rem 0.5rem",
      }}
    >
      <Box display={{ md: "none", xs: "flex" }} alignSelf={"center"}>
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
          <DurationAndQuantity />
          <PriceAndType />
          <Search
            setSearchFilter={setSearchFilter}
            searchFilter={searchFilter}
          />
        </Box>
      )}
    </Box>
  );
}
