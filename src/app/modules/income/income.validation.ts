import { z } from 'zod';

export const incomeItemSchema = z.object({
  source: z.string().min(1, 'Income source is required'),
  amount: z.number(),
});

export const incomeSchema = z.object({
  body: z.object({
  
    note: z.string().optional(),
    incomeDate: z.string().min(1, 'Date is required'),
    paymentMethod: z.string().min(1, 'Payment method is required'),
    incomeItems: z
      .array(incomeItemSchema)
      .min(1, 'At least one income item is required'),
  }),
});
