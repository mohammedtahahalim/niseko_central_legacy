import { Button, Stack, styled, Typography } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

interface TJobDescription {
  jobTitle: string;
  jobLink: string;
  jobDescription: string;
  jobStartDate?: string;
}

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "danger",
})({
  width: "fit-content",
  padding: "0rem",
  fontSize: "1.3rem",
});

const StyledDescription = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "danger",
})({
  fontSize: "1.1rem",
  fontFamily: "Source Code Pro",
});

const StyledDate = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "danger",
})({
  fontSize: "1rem",
  fontFamily: "Source Code Pro",
  "& span": {
    fontSize: "1.1rem",
    fontWeight: "700",
    fontFamily: "Roboto",
  },
});

export default function JobPosition({
  jobTitle,
  jobLink,
  jobDescription,
  jobStartDate,
}: TJobDescription) {
  return (
    <Stack direction={"column"} gap={"5px"}>
      <StyledButton
        variant="text"
        href={jobLink}
        endIcon={<LinkIcon />}
        color="secondary"
      >
        {jobTitle}
      </StyledButton>
      <StyledDescription variant="subtitle2" color="secondary">
        {jobDescription}
      </StyledDescription>
      {jobStartDate && (
        <StyledDate variant="body2" color="secondary">
          <span style={{ fontWeight: "700" }}>Start Date: </span> {jobStartDate}
        </StyledDate>
      )}
    </Stack>
  );
}
