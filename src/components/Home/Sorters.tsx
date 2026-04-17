import { Stack, Button, styled } from "@mui/material";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useContext } from "react";
import { AppContext } from "../../utils/context";

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

  return (
    <Stack direction={"row"} p={"0rem 1rem"} gap={"20px"}>
      {appContent.sorters.map((sorter) => {
        return (
          <CustomButton
            variant="text"
            key={sorter}
            startIcon={<UnfoldMoreIcon />}
          >
            {sorter}
          </CustomButton>
        );
      })}
    </Stack>
  );
}
