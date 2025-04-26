import { z } from 'zod';

export const createSubjectSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Subject name is required'),
    code: z.string().min(1, 'Subject code is required'),
    image: z.string().optional(),
    paper: z.string().optional(),
    lessons: z
      .array(
        z.object({
          lessonNo: z.number({
            required_error: 'Lesson number is required',
          }),
          lessonName: z.string().min(1, 'Lesson name is required'),
        }),
      )
      .optional(),
      classes: z
      .array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid class ID'))
      .optional(),
    
    teachers: z
      .array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid teacher ID'))
      .optional(),
    
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
      classes: z
      .array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid class ID'))
      .optional(),
    
    teachers: z
      .array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid teacher ID'))
      .optional(),
    
  }),
});

export const subjectValidation = {
  createSubjectSchema,
  updateSubjectSchema,
};
