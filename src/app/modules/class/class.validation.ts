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
    students: z
      .array(z.string({required_error:'Student is required'})),
    teachers: z
      .array(z.string({required_error:'Student is required'})), 
    sections: z
      .array(z.string({required_error:'Section is required'})),
    subjects: z
      .array(z.string({required_error:'Subjects is required'})),
  }),
});

const updateClassValidation = z.object({
  body: z.object({
    className: z
      .string()
      .min(1, 'Class name must not be empty')
      .optional(),
    description: z
      .string()
      .min(1, 'Description must not be empty')
      .optional(),
    students: z
      .array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid student ID format'))
      .optional(),
    teachers: z
      .array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid teacher ID format'))
      .optional(),
    sections: z
      .array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid section ID format'))
      .optional(),
    subjects: z
      .array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid subject ID format'))
      .optional(),
  }),
});

export const ClassValidations = {
  createClassValidation,
  updateClassValidation,
};
