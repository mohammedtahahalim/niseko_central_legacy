import { z } from "zod";
import { linkRegex } from "./helpers";

export const jobSchema = z.object({
  jobTitle: z.string().min(10).max(100),
  jobLink: z.custom(linkRegex, "Not A Link"),
  jobDescription: z.string().max(500),
  jobStartDate: z.string().optional(),
});
