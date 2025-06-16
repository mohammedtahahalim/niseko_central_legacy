import { z } from "zod";
import { linkRegex } from "./helpers";

export const jobSchema = z.object({
  jobTitle: z.string().min(10).max(100),
  jobLink: z.custom(linkRegex, "Not A Link"),
  jobDescription: z.string().max(500),
  jobStartDate: z.string().optional(),
});

export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(4, { message: "First Name Must be at least 4 characters long" })
      .max(20, {
        message: "First Name Must be no more than 20 characters long",
      }),
    lastName: z
      .string()
      .min(4, { message: "Last Name Must be at least 4 characters long" })
      .max(20, { message: "Last NameMust be no more than 20 characters long" }),
    email: z
      .string()
      .regex(/^(?!=.*\.\.)[a-zA-z0-9._]+@[a-zA-Z0-9]{2,}(.[a-zA-Z0-9]{2,})+$/, {
        message: "Enter a Valid Email",
      }),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*_+=-])[a-zA-Z0-9~!@#$%^&*_+=-]{8,}$/,
        { message: "Password Must Be Secure" }
      ),
    repeatPassword: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*_+=-])[a-zA-Z0-9~!@#$%^&*_+=-]{8,}$/,
        { message: "Repeat Password Must Be Secure" }
      ),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.repeatPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
      });
    }
  });
