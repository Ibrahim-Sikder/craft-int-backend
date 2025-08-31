// loan/validation.ts
import { z } from 'zod';

const createLoanValidation = z.object({
  body: z.object({
    loan_type: z.enum(['taken', 'given']),
    lenderName: z.string(),
    borrowerName: z.string(),
    contactNumber: z.string(),
    loan_amount: z.number().min(0),
    interest_rate: z.number().min(0).optional(),
    loan_date: z.date().optional(),
    repayment_start_date: z.date().optional(),
    repayment_end_date: z.date().optional(),
    monthly_installment: z.number().min(0).optional(),
  })
});

const updateLoanValidation = z.object({
  body: z.object({
    loan_type: z.enum(['taken', 'given']).optional(),
    lenderName: z.string().optional(),
    borrowerName: z.string().optional(),
    contactNumber: z.string().optional(),
    loan_amount: z.number().min(0).optional(),
    interest_rate: z.number().min(0).optional(),
    loan_date: z.date().optional(),
    repayment_start_date: z.date().optional(),
    repayment_end_date: z.date().optional(),
    monthly_installment: z.number().min(0).optional(),
    status: z.enum(['active', 'paid', 'defaulted', 'overdue']).optional(),
  })
});

const addRepaymentValidation = z.object({
  body: z.object({
    date: z.date(),
    amount: z.number().min(0),
    type: z.enum(['principal', 'interest', 'penalty']),
    note: z.string().optional(),
  })
});

const transferLoanValidation = z.object({
  body: z.object({
    lenderName: z.string(),
    borrowerName: z.string(),
    contactNumber: z.string(),
    interest_rate: z.number().min(0),
    repayment_end_date: z.date(),
  })
});

export const LoanValidations = {
  createLoanValidation,
  updateLoanValidation,
  addRepaymentValidation,
  transferLoanValidation
};