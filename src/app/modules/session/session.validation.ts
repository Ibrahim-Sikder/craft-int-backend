import { z } from 'zod';

const createSessionValidation = z.object({
  body: z.object({
    sessionName: z.string().min(1, 'Session name is required'),
    isCurrent: z.boolean().optional(),
    startDate: z
      .string()
      .refine(val => !isNaN(Date.parse(val)), {
        message: 'Invalid start date',
      }),
    endDate: z
      .string()
      .refine(val => !isNaN(Date.parse(val)), {
        message: 'Invalid end date',
      }),
    workingDays: z.number().nonnegative().optional(),
    holidays: z.number().nonnegative().optional(),
  }),
});

const updateSessionValidation = z.object({
  body: z.object({
    sessionName: z.string().optional(),
    isCurrent: z.boolean().optional(),
    startDate: z
      .string()
      .refine(val => !isNaN(Date.parse(val)), {
        message: 'Invalid start date',
      })
      .optional(),
    endDate: z
      .string()
      .refine(val => !isNaN(Date.parse(val)), {
        message: 'Invalid end date',
      })
      .optional(),
    workingDays: z.number().nonnegative().optional(),
    holidays: z.number().nonnegative().optional(),
  }),
});

export const SessionValidations = {
  createSessionValidation,
  updateSessionValidation,
};
