import { z } from 'zod';

const createSectionValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Section name is required' }),
  }),
});

const updateSectionValidation = z.object({
  body: z.object({
    name: z.string().optional()
  }),
});

export const SectionValidations = {
  createSectionValidation,
  updateSectionValidation,
};
