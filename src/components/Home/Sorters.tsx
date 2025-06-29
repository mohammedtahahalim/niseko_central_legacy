import { Stack, Button, styled } from "@mui/material";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../utils/context";
import { sorters } from "../../utils/helpers";

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
});

interface IActiveState {
  sorter: string;
  state: "ASC" | "DESC";
}

export default function Sorters() {
  const { appContent, filteredContent, setFilteredContent } =
    useContext(AppContext);
  const [currentActive, setCurrentActive] = useState<IActiveState>({
    sorter: "",
    state: "ASC",
  });

  useEffect(() => {
    if (currentActive.sorter) {
      const sorted = sorters(currentActive.sorter, currentActive.state, [
        ...filteredContent,
      ]);
      setFilteredContent(sorted);
    }
  }, [currentActive]);

  return (
    <Stack direction={"row"} p={"0rem 1rem"} gap={"20px"}>
      {appContent.sorters.map((sorter) => {
        return (
          <CustomButton
            variant="text"
            key={sorter}
            startIcon={
              sorter === currentActive.sorter ? (
                currentActive.state === "ASC" ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )
              ) : (
                <UnfoldMoreIcon />
              )
            }
            onClick={() =>
              setCurrentActive({
                sorter,
                state: currentActive.state === "ASC" ? "DESC" : "ASC",
              })
            }
          >
            {sorter}
          </CustomButton>
        );
      })}
    </Stack>
  );
}
