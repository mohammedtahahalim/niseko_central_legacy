import { Stack } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../utils/context";
import { jobSchema } from "../../utils/schema";
import JobPosition from "./JobPosition";

export default function Yearly() {
  const { appContent } = useContext(AppContext);
  return (
    <Stack direction={"column"} gap={"2.5rem"}>
      {appContent.about.jobs.yearly
        .filter((listing) => jobSchema.safeParse(listing))
        .map((listing) => {
          return (
            <JobPosition
              jobTitle={listing.jobTitle}
              jobDescription={listing.jobDescription}
              jobLink={listing.jobLink}
              key={listing.jobTitle}
            />
          );
        })}
    </Stack>
  );
}
