import { z } from 'zod';

export const createSubjectSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Subject name is required'),
    code: z.string().min(1, 'Subject code is required'),
    image: z.string().url('Invalid image URL').optional(),
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
    classId: z.string().min(1, 'Class ID is required'),
    teacherId: z.string().optional(),
    isOptional: z.boolean().optional(),
  }),
});

export const updateSubjectSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    code: z.string().optional(),
    image: z.string().url('Invalid image URL').optional(),
    paper: z.string().optional(),
    lessons: z
      .array(
        z.object({
          lessonNo: z.number().optional(),
          lessonName: z.string().optional(),
        }),
      )
      .optional(),
    classId: z.string().optional(),
    teacherId: z.string().optional(),
    isOptional: z.boolean().optional(),
  }),
});

export const subjectValidation = {
  createSubjectSchema,
  updateSubjectSchema,
};
