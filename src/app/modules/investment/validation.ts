import { z } from "zod";

// Common enums from model
const investmentTypeEnum = z.enum(["short_term", "long_term"]);
const statusEnum = z.enum(["active", "closed"]);

const createInvestmentValidation = z.object({
  body: z.object({
    investment_type: investmentTypeEnum, 
    investment_name: z.string({
      required_error: "Investment name is required",
    }), 
    amount: z
      .number({
        required_error: "Amount is required",
        invalid_type_error: "Amount must be a number",
      })
      .min(1, { message: "Amount must be > 0" }),
    date: z
      .preprocess((val) => (val ? new Date(val as string) : undefined), z.date())
      .optional(),
    expected_return: z
      .number({
        invalid_type_error: "Expected return must be a number",
      })
      .min(0, { message: "Expected return must be positive" })
      .optional(),
    maturity_date: z
      .preprocess((val) => (val ? new Date(val as string) : undefined), z.date())
      .optional(),
    status: statusEnum.optional(),
  }),
});

const updateInvestmentValidation = z.object({
  body: z.object({
    investment_type: investmentTypeEnum.optional(),
    investment_name: z.string().optional(),
    amount: z.number().min(1, { message: "Amount must be > 0" }).optional(),
    date: z
      .preprocess((val) => (val ? new Date(val as string) : undefined), z.date())
      .optional(),
    expected_return: z
      .number()
      .min(0, { message: "Expected return must be positive" })
      .optional(),
    maturity_date: z
      .preprocess((val) => (val ? new Date(val as string) : undefined), z.date())
      .optional(),
    status: statusEnum.optional(),
  }),
});

export const InvestmentValidations = {
  createInvestmentValidation,
  updateInvestmentValidation,
};
