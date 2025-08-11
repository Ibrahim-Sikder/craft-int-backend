// src/validations/salary.validation.ts

import { z } from "zod";
import mongoose from "mongoose";

export const createSalarySchema = z.object({
body:z.object({
    employeeId: z
    .string()
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid employee ID",
    }),
  effectiveDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  basicSalary: z.number().min(0, "Basic salary cannot be negative"),
  houseRent: z.number().min(0).optional().default(0),
  medicalAllowance: z.number().min(0).optional().default(0),
  transportAllowance: z.number().min(0).optional().default(0),
  foodAllowance: z.number().min(0).optional().default(0),
  otherAllowances: z.number().min(0).optional().default(0),
  incomeTax: z.number().min(0).optional().default(0),
  providentFund: z.number().min(0).optional().default(0),
  otherDeductions: z.number().min(0).optional().default(0),
  notes: z.string().optional(),
})
});
