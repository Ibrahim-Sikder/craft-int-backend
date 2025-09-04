// investment/validation.ts
import { z } from 'zod';

const createInvestmentValidation = z.object({
  body: z.object({
    investmentCategory: z.enum(['outgoing', 'incoming']),
    investmentTo: z.string().optional(),
    investmentType: z.string().optional(),
    investorName: z.string().optional(),
    investorContact: z.string().optional(),
    incomingType: z.string().optional(),
    returnPolicy: z.string().optional(),
    investmentAmount: z.number().min(1),
    investmentDate: z.string().optional(),
    maturityDate: z.string().optional(),
    returnRate: z.number().min(0).optional(),
  })
});

const updateInvestmentValidation = z.object({
  body: z.object({
    investmentCategory: z.enum(['outgoing', 'incoming']).optional(),
    investmentTo: z.string().optional(),
    investmentType: z.string().optional(),
    investorName: z.string().optional(),
    investorContact: z.string().optional(),
    incomingType: z.string().optional(),
    returnPolicy: z.string().optional(),
    investmentAmount: z.number().min(1).optional(),
   investmentDate: z.string().optional(),
    maturityDate: z.string().optional(),
    returnRate: z.number().min(0).optional(),
    status: z.enum(['active', 'closed', 'withdrawn', 'matured']).optional(),
  })
});

const addReturnValidation = z.object({
  body: z.object({
    date: z.string().optional(),
    amount: z.number().min(0),
    type: z.enum(['interest', 'principal', 'dividend', 'capital_gain']),
    note: z.string().optional(),
  })
});

export const InvestmentValidations = {
  createInvestmentValidation,
  updateInvestmentValidation,
  addReturnValidation
};