import { Stack, Button, styled } from "@mui/material";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useContext, useEffect } from "react";
import { AppContext } from "../../utils/context";
import { useSearchParams } from "react-router-dom";
import { changeSort, type ActiveSort } from "../../store/slices/bookingsSlice";
import { useDispatch } from "react-redux";
import type { AppDisptach } from "../../store/store";

const CustomButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "danger",
})({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "0rem",
  minWidth: "fit-content",
  gap: "1px",
  "& .MuiButton-startIcon": {
    marginRight: 0,
  },
  minHeight: "25px",
});

export default function Sorters() {
  const { appContent } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") as ActiveSort;
  const sortDir = searchParams.get("sortDir");
  const dispatch = useDispatch<AppDisptach>();

  const changeActiveSort = (sort: ActiveSort) => {
    if (!sort) return;
    setSearchParams((searchParams) => {
      searchParams.set("sortBy", sort);
      searchParams.set(
        "sortDir",
        sort === sortBy ? (sortDir === "desc" ? "asc" : "desc") : "desc",
      );
      return searchParams;
    });
  };

  useEffect(() => {
    dispatch(changeSort({ sortBy, sortDir }));
  }, [dispatch, sortBy, sortDir]);

  return (
    <Stack direction={"row"} p={"0rem 1rem"} gap={"20px"}>
      {appContent.sorters.map((sorter) => {
        return (
          <CustomButton
            variant="text"
            key={sorter.key}
            startIcon={
              sorter.key === sortBy ? (
                sortDir === "desc" ? (
                  <ExpandMoreIcon />
                ) : (
                  <ExpandLessIcon />
                )
              ) : (
                <UnfoldMoreIcon />
              )
            }
            onClick={() => changeActiveSort(sorter.key as ActiveSort)}
          >
            {sorter.value}
          </CustomButton>
        );
      })}
    </Stack>
  );
}
