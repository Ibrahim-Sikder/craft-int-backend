import { z } from 'zod';

export const createSubjectSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Subject name is required').trim(),
    code: z.string().min(1, 'Subject code is required').trim(),
    image: z.string().optional(),
    paper: z.string().optional(),
    lessons: z
      .array(
        z.object({
          lessonNo: z.number({
            required_error: 'Lesson number is required',
          }),
          lessonName: z.string().min(1, 'Lesson name is required'),
        })
      )
      .optional(),
    classes: z.array(z.string()).optional(),
    teachers: z.array(z.string()).optional(),
    isOptional: z.boolean().optional(),
  }),
});
export const updateSubjectSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    code: z.string().optional(),
    image: z.string().optional(),
    paper: z.string().optional(),
    lessons: z
      .array(
        z.object({
          lessonNo: z.number().optional(),
          lessonName: z.string().optional(),
        }),
      )
      .optional(),
    classes: z.array(z.string()).optional(),

    teachers: z.array(z.string()).optional(),
  }),
});

export const subjectValidation = {
  createSubjectSchema,
  updateSubjectSchema,
};
