import { z } from 'zod';

const createHifzSubjectValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'HifzSubject name is required' }),

  }),
});

const updateHifzSubjectValidation = z.object({
  body: z.object({
    name: z.string().optional()
  }),
});

export const HifzSubjectValidations = {
  createHifzSubjectValidation,
  updateHifzSubjectValidation,
};
