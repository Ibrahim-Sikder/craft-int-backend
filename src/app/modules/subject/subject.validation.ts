import { z } from 'zod';

export const createSubjectSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Subject name is required').trim(),
    paper: z.string().optional(),
  }),
});
export const updateSubjectSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    paper: z.string().optional(),
  }),
});

export const subjectValidation = {
  createSubjectSchema,
  updateSubjectSchema,
};
