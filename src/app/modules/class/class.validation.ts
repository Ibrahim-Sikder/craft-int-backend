import { z } from 'zod';

const createClassValidation = z.object({
  body: z.object({
    className: z
      .string({
        required_error: 'Class name is required',
      })
      .min(1, 'Class name must not be empty'),
    description: z
      .string({
        required_error: 'Description is required',
      })
      .min(1, 'Description must not be empty'),
  }),
});

const updateClassValidation = z.object({
  body: z.object({
    className: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const ClassValidations = {
  createClassValidation,
  updateClassValidation,
};
