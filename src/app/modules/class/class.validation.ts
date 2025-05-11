import { z } from 'zod';
const createClassValidation = z.object({
  body: z.object({
    className: z
      .string({
        required_error: 'Class name is required',
      })
  }),
});

const updateClassValidation = z.object({
  body: z.object({
    className: z
      .string()
      .optional()
  }),
});

export const ClassValidations = {
  createClassValidation,
  updateClassValidation,
};
