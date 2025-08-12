// src/validations/salary.validation.ts

import { z } from 'zod';
export const createSalarySchema = z.object({
  body: z.object({
    employee: z.string().optional(),
    basicSalary: z.number().optional(),
    houseRent: z.number().min(0).optional().default(0),
    medicalAllowance: z.number().min(0).optional().default(0),
    transportAllowance: z.number().min(0).optional().default(0),
    foodAllowance: z.number().min(0).optional().default(0),
    otherAllowances: z.number().min(0).optional().default(0),
    incomeTax: z.number().min(0).optional().default(0),
    providentFund: z.number().min(0).optional().default(0),
    otherDeductions: z.number().min(0).optional().default(0),
    notes: z.string().optional(),
  }),
});
