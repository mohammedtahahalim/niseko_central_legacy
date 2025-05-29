import { Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function SocialMedia() {
  return (
    <Stack
      direction={"row"}
      gap={"10px"}
      display={{ md: "flex", xs: "none" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <FacebookIcon />
      <XIcon />
      <InstagramIcon />
      <LinkedInIcon />
    </Stack>
  );
}
