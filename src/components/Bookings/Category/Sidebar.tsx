import { Box, Button, Stack, styled } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../../utils/context";
import { Link } from "react-router-dom";

const StyledSideBar = styled(Box, {
  shouldForwardProp: (prop) => prop !== "danger",
})({
  display: "flex",
  maxWidth: "250px",
});
export default function Sidebar() {
  const { appContent } = useContext(AppContext);
  return (
    <StyledSideBar
      width={{ md: "30%", xs: "100%" }}
      flexDirection={{ md: "column", xs: "column", sm: "row" }}
    >
      <Stack direction={"column"} gap={"5px"}>
        {appContent.all_booking_categories.map((element) => {
          return (
            <Button
              variant="text"
              color="primary"
              component={Link}
              to={`/booking${element[1]}`}
              key={element[1]}
              sx={{
                p: "0rem",
                fontFamily: "Source Code Pro",
                width: "fit-content",
                textAlign: "left",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              {element[0]}
            </Button>
          );
        })}
      </Stack>
    </StyledSideBar>
  );
}
