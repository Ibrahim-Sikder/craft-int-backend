import { z } from "zod";
const reportTypeEnum = z.enum(["nazera", "ampara", "hifz", "qaida"]);

const reportRowSchema = z.object({
  label: z.string({
    required_error: "Label is required",
  }),
  values: z
    .array(z.string().optional())
    .min(1, "At least one value required")
    .max(10, "Too many values"),
});

const createWeeklyReportValidation = z.object({
  body: z.object({
    studentName: z.string({
      required_error: "Student name is required",
    }),
    month: z.string({
      required_error: "Month is required",
    }),
    reportType: reportTypeEnum,
    rows: z
      .array(reportRowSchema)
      .nonempty("At least one report row is required"),
  }),
});

const updateWeeklyReportValidation = z.object({
  body: z.object({
    studentName: z.string().optional(),

    month: z.string().optional(),
    reportType: reportTypeEnum.optional(),
    rows: z.array(reportRowSchema).optional(),
  }),
});

export const WeeklyReportValidations = {
  createWeeklyReportValidation,
  updateWeeklyReportValidation,
};
