import { z } from 'zod';

const createSectionValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Section name is required' }),
    sectionType: z.enum(['morning', 'evening'], {
      required_error: 'Section type is required',
    }),
    rooms: z.array(z.string({ required_error: 'Room ID is required' })),
    classes: z.array(z.string({ required_error: 'Class ID is required' })),
    teachers: z.array(z.string({ required_error: 'Class ID is required' })),
    timeSlots: z.array(
      z.string({ required_error: 'Time Slot ID is required' }),
    ),
  }),
});

const updateSectionValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Section name is required' }).optional(),
    sectionType: z
      .enum(['morning', 'evening'], {
        required_error: 'Section type is required',
      })
      .optional(),
    rooms: z
      .array(z.string({ required_error: 'Room ID is required' }))
      .optional(),
    classes: z
      .array(z.string({ required_error: 'Class ID is required' }))
      .optional(),
    teachers: z
      .array(z.string({ required_error: 'Class ID is required' }))
      .optional(),
    timeSlots: z
      .array(z.string({ required_error: 'Time Slot ID is required' }))
      .optional(),
  }),
});

export const SectionValidations = {
  createSectionValidation,
  updateSectionValidation,
};
