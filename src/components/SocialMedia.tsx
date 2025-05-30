import { IconButton, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function SocialMedia() {
  return (
    <Stack
      direction={"row"}
      display={{ md: "flex", xs: "none" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <IconButton href="https://www.facebook.com/nisekocentral">
        <FacebookIcon color="primary" />
      </IconButton>
      <IconButton href="https://twitter.com/nisekocentral">
        <XIcon color="primary" />
      </IconButton>
      <IconButton href="https://www.instagram.com/nisekocentral/">
        <InstagramIcon color="primary" />
      </IconButton>
      <IconButton href="https://www.linkedin.com/company/ht-holidays">
        <LinkedInIcon color="primary" />
      </IconButton>
    </Stack>
  );
}
