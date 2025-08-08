import { z } from 'zod';

const createIncomeCategoryValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'IncomeCategory name is required' })
  }),
});

const updateIncomeCategoryValidation = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});

export const IncomeCategoryValidations = {
  createIncomeCategoryValidation,
  updateIncomeCategoryValidation,
};
