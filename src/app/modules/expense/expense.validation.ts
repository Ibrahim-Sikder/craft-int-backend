import { z } from 'zod';

export const expenseItemSchema = z.object({
  source: z.string().min(1, 'Expense source is required'),
  description: z.string().optional(),
  amount: z.number(),
});

export const expenseSchema = z.object({
  body: z.object({
    category: z.string().optional(),
    note: z.string().optional(),
    expenseDate: z.string().min(1, 'Date is required'),
    paymentMethod: z.string().min(1, 'Payment method is required'),
    status: z.string().optional(),
    expenseItems: z
      .array(expenseItemSchema)
      .min(1, 'At least one expense item is required'),
    totalAmount: z.number().optional(),
  }),
});
