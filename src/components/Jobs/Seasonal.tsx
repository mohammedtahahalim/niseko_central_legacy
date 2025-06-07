import { Stack } from "@mui/material";
import JobPosition from "./JobPosition";
import { useContext } from "react";
import { AppContext } from "../../utils/context";
import { jobSchema } from "../../utils/schema";

export default function Seasonal() {
  const { appContent } = useContext(AppContext);

  return (
    <Stack direction={"column"} gap={"2.5rem"}>
      {appContent.about.jobs.seasonal
        .filter((listing) => jobSchema.safeParse(listing))
        .map((listing) => {
          return (
            <JobPosition
              jobTitle={listing.jobTitle}
              jobDescription={listing.jobDescription}
              jobLink={listing.jobLink}
              jobStartDate={listing.jobStartDate}
              key={listing.jobTitle}
            />
          );
        })}
    </Stack>
  );
}
