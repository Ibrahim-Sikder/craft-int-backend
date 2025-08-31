import { z } from 'zod';

const createExpenseCategoryValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'ExpenseCategory name is required' }),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

const updateExpenseCategoryValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const ExpenseCategoryValidations = {
  createExpenseCategoryValidation,
  updateExpenseCategoryValidation,
};
