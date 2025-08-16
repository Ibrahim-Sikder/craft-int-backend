import { z } from 'zod';

const createHifzClassReportValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'HifzClassReport name is required' }),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

const updateHifzClassReportValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const HifzClassReportValidations = {
  createHifzClassReportValidation,
  updateHifzClassReportValidation,
};
