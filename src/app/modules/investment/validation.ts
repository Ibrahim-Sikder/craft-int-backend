/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from 'zod';

const categoryEnum = z.enum(['outgoing', 'incoming']);

const statusEnum = z.enum(['active', 'closed', 'withdrawn']);

const returnHistorySchema = z.object({
  date: z
    .preprocess(
      (val) => (val ? new Date(val as string) : null),
      z.date().nullable(),
    )
    .optional(),
  amount: z
    .number()
    .min(0, { message: 'Return amount must be >= 0' })
    .nullable()
    .optional(),
});

// ================== CREATE ==================
const createInvestmentValidation = z.object({
  body: z.object({
    investmentCategory: categoryEnum.nullable().optional(),

    // Outgoing
    investmentTo: z.string().nullable().optional(),
    investmentType: z.string().nullable().optional(),

    // Incoming
    investorName: z.string().nullable().optional(),
    investorContact: z.string().nullable().optional(),
    incomingType: z.string().nullable().optional(),
    returnPolicy: z.string().nullable().optional(),

    // Common
    investmentAmount: z
      .number()
      .min(1, { message: 'Amount must be > 0' })
      .nullable()
      .optional(),
    investmentDate: z
      .preprocess(
        (val) => (val ? new Date(val as string) : null),
        z.date().nullable(),
      )
      .optional(),
    maturityDate: z
      .preprocess(
        (val) => (val ? new Date(val as string) : null),
        z.date().nullable(),
      )
      .optional(),
    returnRate: z
      .number()
      .min(0, { message: 'Return rate must be >= 0' })
      .nullable()
      .optional(),
    status: statusEnum.nullable().optional(),
    returnHistory: z.array(returnHistorySchema).nullable().optional(),
  }),
});

// ================== UPDATE ==================
const updateInvestmentValidation = z.object({
  body: z.object({
    investmentCategory: categoryEnum.nullable().optional(),

    investmentTo: z.string().nullable().optional(),
    investmentType: z.string().nullable().optional(),

    investorName: z.string().nullable().optional(),
    investorContact: z.string().nullable().optional(),
    incomingType: z.string().nullable().optional(),
    returnPolicy: z.string().nullable().optional(),

    investmentAmount: z
      .number()
      .min(1, { message: 'Amount must be > 0' })
      .nullable()
      .optional(),
    investmentDate: z
      .preprocess(
        (val) => (val ? new Date(val as string) : null),
        z.date().nullable(),
      )
      .optional(),
    maturityDate: z
      .preprocess(
        (val) => (val ? new Date(val as string) : null),
        z.date().nullable(),
      )
      .optional(),
    returnRate: z
      .number()
      .min(0, { message: 'Return rate must be >= 0' })
      .nullable()
      .optional(),
    status: statusEnum.nullable().optional(),
    returnHistory: z.array(returnHistorySchema).nullable().optional(),
  }),
});

export const InvestmentValidations = {
  createInvestmentValidation,
  updateInvestmentValidation,
};
