import { z } from 'zod';

const createHifzClassValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'HifzClass name is required' }),

  }),
});

const updateHifzClassValidation = z.object({
  body: z.object({
    name: z.string().optional()
  }),
});

export const HifzClassValidations = {
  createHifzClassValidation,
  updateHifzClassValidation,
};
