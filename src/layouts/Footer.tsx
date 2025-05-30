import {
  Box,
  Button,
  Container,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Logo from "../components/Logo";
import SocialMedia from "../components/SocialMedia";
import Copyrights from "../components/Copyrights";
import MuiBox from "../components/MuiBox";
import { useContext } from "react";
import { AppContext } from "../utils/context";

export default function Footer() {
  const { appContent } = useContext(AppContext);
  return (
    <Stack direction={"column"}>
      <MuiBox variant="secondary">
        <Container
          disableGutters
          sx={{
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            gap: { md: "20px", xs: "5px" },
          }}
        >
          <Stack
            direction={{ sm: "row", xs: "column" }}
            flex={"1"}
            justifyContent={"space-between"}
            p={"1rem"}
            gap={"10px"}
          >
            <Stack direction={"row"} width={"100%"}>
              {appContent.footer.menus.slice(0, 2).map((element, key) => {
                return (
                  <Stack
                    direction={"column"}
                    key={key}
                    flex={"1"}
                    justifyContent={{ sm: "flex-start", xs: "center" }}
                  >
                    {element.map((footerNav, key) => {
                      return (
                        <Button
                          variant="text"
                          key={footerNav}
                          color={key === 0 ? "secondary" : "primary"}
                          size="small"
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            width: "fit-content",
                            textAlign: "left",
                          }}
                        >
                          {footerNav}
                        </Button>
                      );
                    })}
                  </Stack>
                );
              })}
            </Stack>
            <Stack direction={"row"} width={"100%"}>
              {appContent.footer.menus.slice(2).map((element, key) => {
                return (
                  <Stack direction={"column"} key={key} flex={"1"}>
                    {element.map((footerNav, key) => {
                      return (
                        <Button
                          variant="text"
                          key={footerNav}
                          color={key === 0 ? "secondary" : "primary"}
                          size="small"
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            width: "fit-content",
                            textAlign: "left",
                          }}
                        >
                          {footerNav}
                        </Button>
                      );
                    })}
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
          <Box
            maxWidth={{ md: "35%", xs: "75%" }}
            p={"1rem"}
            alignSelf={"center"}
          >
            <Typography variant="subtitle1" color="primary">
              {appContent.footer.newsletter.title}
            </Typography>
            <Typography
              variant="subtitle2"
              color="secondary"
              sx={{ marginBottom: "15px" }}
            >
              {appContent.footer.newsletter.subtitle}
            </Typography>
            <FormGroup sx={{ gap: "10px" }}>
              <TextField
                label={appContent.footer.newsletter.given_name}
                size="small"
                type="text"
              />
              <TextField
                label={appContent.footer.newsletter.full_name}
                size="small"
                type="text"
              />
              <TextField
                label={appContent.footer.newsletter.email}
                size="small"
                type="email"
              />
              <Button
                variant="contained"
                color="secondary"
                sx={{ width: "fit-content" }}
              >
                {appContent.footer.newsletter.subscribe}
              </Button>
            </FormGroup>
          </Box>
        </Container>
      </MuiBox>
      <MuiBox variant="primary">
        <Container disableGutters>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{
              justifyContent: { xs: "center", sm: "space-between" },
              alignItems: "center",
            }}
            px={"2rem"}
          >
            <Logo />
            <SocialMedia />
            <Copyrights />
          </Stack>
        </Container>
      </MuiBox>
    </Stack>
  );
}
