import { z } from 'zod';
const createClassValidation = z.object({
  body: z.object({
    className: z.string({
      required_error: 'Class name is required',
    }),

   sections: z
      .array(z.string()).optional(),
  }),
});

const updateClassValidation = z.object({
  body: z.object({
    className: z.string().optional(),
    sections: z.array(
      z.string().optional(),
    ),
  }),
     
});

export const ClassValidations = {
  createClassValidation,
  updateClassValidation,
};
