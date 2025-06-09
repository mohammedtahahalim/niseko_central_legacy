import { Stack } from "@mui/material";

export default function Blog() {
  return (
    <Stack
      direction={{ md: "row", xs: "column-reverse" }}
      width={"100%"}
      gap={"1rem"}
      p={"1rem"}
    >
      <Stack>First</Stack>
      <Stack>Second</Stack>
    </Stack>
  );
}
