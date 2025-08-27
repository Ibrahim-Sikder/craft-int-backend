import { z } from 'zod';

const createLoanValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Loan name is required' }),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

const updateLoanValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const LoanValidations = {
  createLoanValidation,
  updateLoanValidation,
};
