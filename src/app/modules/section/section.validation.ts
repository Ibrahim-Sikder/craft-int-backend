import { z } from 'zod';

const createSectionValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Section name is required' }),
    sectionType: z.enum(['morning', 'evening'], {
      required_error: 'Section type is required',
    }),
    classId: z.string({ required_error: 'Class ID is required' }),
    teacherId: z.string().optional(),
    roomId: z.string().optional(),
    timeSlots: z.array(z.string()).optional(),
  }),
});

const updateSectionValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    sectionType: z.enum(['morning', 'evening']).optional(),
    classId: z.string().optional(),
    teacherId: z.string().optional(),
    roomId: z.string().optional(),
    timeSlots: z.array(z.string()).optional(),
  }),
});

export const SectionValidations = {
  createSectionValidation,
  updateSectionValidation,
};
