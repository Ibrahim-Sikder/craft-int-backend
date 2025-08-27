import { z } from 'zod';

const createInvestmentValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Investment name is required' }),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

const updateInvestmentValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const InvestmentValidations = {
  createInvestmentValidation,
  updateInvestmentValidation,
};
