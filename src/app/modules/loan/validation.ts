// loan/validation.ts
import { z } from 'zod';

const createLoanValidation = z.object({
  body: z.object({
    loan_type: z.enum(['taken', 'given']),
    lenderName: z.string().optional(),
    borrowerName: z.string(),
    contactNumber: z.string(),
    loan_amount: z.number().min(0),
    interest_rate: z.number().min(0).optional(),
    loan_date: z.string().optional(),
    repayment_start_date: z.string().optional(),
    repayment_end_date: z.string().optional(),
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
    loan_date: z.string().optional(),
    repayment_start_date: z.string().optional(),
    repayment_end_date: z.string().optional(),
    monthly_installment: z.number().min(0).optional(),
    status: z.enum(['active', 'paid', 'defaulted', 'overdue']).optional(),
  })
});

const addRepaymentValidation = z.object({
  body: z.object({
    date: z.string(),
    amount: z.number().min(0),
    type: z.enum(['principal', 'interest', 'penalty']),
    note: z.string().optional(),
  })
});

const transferLoanValidation = z.object({
  body: z.object({
    lenderName: z.string().optional(),
    borrowerName: z.string().optional(),
    contactNumber: z.string().optional(),
    interest_rate: z.number().min(0).optional(),
    repayment_end_date: z.string().optional(),
  })
});

export const LoanValidations = {
  createLoanValidation,
  updateLoanValidation,
  addRepaymentValidation,
  transferLoanValidation
};