import { z } from "zod";

const loanTypeEnum = z.enum(["taken", "given"]);
const loanStatusEnum = z.enum(["active", "paid", "defaulted"]);

const createLoanValidation = z.object({
  body: z.object({
    loan_type: loanTypeEnum, 
    party: z.string({
      required_error: "Party (User ID) is required",
    }), 
    loan_amount: z
      .number({
        required_error: "Loan amount is required",
        invalid_type_error: "Loan amount must be a number",
      })
      .min(1, { message: "Loan amount must be > 0" }),
    interest_rate: z
      .number({
        invalid_type_error: "Interest rate must be a number",
      })
      .min(0, { message: "Interest rate must be positive" })
      .optional(),
    loan_date: z
      .preprocess((val) => (val ? new Date(val as string) : undefined), z.date())
      .optional(),
    repayment_start_date: z
      .preprocess((val) => (val ? new Date(val as string) : undefined), z.date())
      .optional(),
    repayment_end_date: z
      .preprocess((val) => (val ? new Date(val as string) : undefined), z.date())
      .optional(),
    monthly_installment: z
      .number({
        invalid_type_error: "Installment must be a number",
      })
      .min(0, { message: "Installment must be positive" })
      .optional(),
    status: loanStatusEnum.optional(),
  }),
});

const updateLoanValidation = z.object({
  body: z.object({
    loan_type: loanTypeEnum.optional(),
    party: z.string().optional(),
    loan_amount: z
      .number()
      .min(1, { message: "Loan amount must be > 0" })
      .optional(),
    interest_rate: z
      .number()
      .min(0, { message: "Interest rate must be positive" })
      .optional(),
    loan_date: z
      .preprocess((val) => (val ? new Date(val as string) : undefined), z.date())
      .optional(),
    repayment_start_date: z
      .preprocess((val) => (val ? new Date(val as string) : undefined), z.date())
      .optional(),
    repayment_end_date: z
      .preprocess((val) => (val ? new Date(val as string) : undefined), z.date())
      .optional(),
    monthly_installment: z.number().min(0).optional(),
    status: loanStatusEnum.optional(),
  }),
});

export const LoanValidations = {
  createLoanValidation,
  updateLoanValidation,
};
