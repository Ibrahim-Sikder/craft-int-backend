import { z } from 'zod';

const createSubjectValidation = z.object({
  body: z.object({
    subjectName: z.string({
      required_error: 'Subject name is required',
    }),
    subjectCode: z
      .string({
        required_error: 'Subject code is required',
      })
      .min(2, 'Subject code must be at least 2 characters'),
    description: z.string().optional(),
    classId: z.string({
      required_error: 'Class ID is required',
    }),
    teacherId: z.string().optional(),
  }),
});

const updateSubjectValidation = z.object({
  body: z.object({
    subjectName: z.string().optional(),
    subjectCode: z.string().min(2).optional(),
    description: z.string().optional(),
    classId: z.string().optional(),
    teacherId: z.string().optional(),
  }),
});

export const SubjectValidations = {
  createSubjectValidation,
  updateSubjectValidation,
};
