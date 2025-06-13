import { Box, Button, styled, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect, useRef, useState } from "react";

interface INavBar {
  title: string;
  links: string[][];
}

interface IStyledBar {
  customHeight: number;
  openModal: boolean;
}

const StyledBar = styled(Box, {
  shouldForwardProp: (prop) => prop !== "customHeight" && prop !== "openModal",
})<IStyledBar>(({ customHeight, openModal, theme }) => ({
  maxHeight: openModal ? "300px" : `${customHeight}px`,
  transition: "max-height 0.5s linear",
  overflow: "hidden",
  width: "275px",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export default function NavBar({ title, links }: INavBar) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const [customHeight, setCustomHeight] = useState<number>(0);

  useEffect(() => {
    if (!titleRef.current) return;
    setCustomHeight(titleRef.current.offsetHeight + 3 || 0);
  }, []);

  return (
    <StyledBar customHeight={customHeight} openModal={openModal}>
      <Box
        ref={titleRef}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        py={"6px"}
      >
        <Button
          onClick={() => setOpenModal(!openModal)}
          color="secondary"
          size="large"
          sx={{
            fontFamily: "Source Code Pro",
            px: "0rem",
            justifyContent: "flex-start",
          }}
        >
          {title}
        </Button>
        <Box onClick={() => setOpenModal(!openModal)}>
          {openModal ? (
            <RemoveIcon color="secondary" sx={{ fontSize: "1rem" }} />
          ) : (
            <AddIcon color="secondary" sx={{ fontSize: "1rem" }} />
          )}
        </Box>
      </Box>
      <Stack direction={"column"} py={"4px"}>
        {links.map((link) => {
          return (
            <Button
              variant="text"
              component={"a"}
              href={link[2]}
              sx={{
                fontFamily: "Segoe UI",
                px: "0rem",
                justifyContent: "flex-start",
                textWrap: "wrap",
              }}
              key={link[0]}
            >
              {link[0]}
            </Button>
          );
        })}
      </Stack>
    </StyledBar>
  );
}
