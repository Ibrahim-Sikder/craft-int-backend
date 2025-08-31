import { z } from 'zod';

const createTransactionValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Transaction name is required' }),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

const updateTransactionValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const TransactionValidations = {
  createTransactionValidation,
  updateTransactionValidation,
};
