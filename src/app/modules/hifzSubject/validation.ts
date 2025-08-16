import { z } from 'zod';

const createHifzSubjectValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'HifzSubject name is required' }),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

const updateHifzSubjectValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const HifzSubjectValidations = {
  createHifzSubjectValidation,
  updateHifzSubjectValidation,
};
