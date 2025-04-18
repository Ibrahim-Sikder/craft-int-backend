import { z } from 'zod';

const createTimeSlotValidation = z.object({
  body: z.object({
    startTime: z
      .string({
        required_error: 'Start time is required',
      })
      .min(1, 'Start time must not be empty'),
    endTime: z
      .string({
        required_error: 'End time is required',
      })
      .min(1, 'End time must not be empty'),
    day: z
      .string({
        required_error: 'Day is required',
      })
      .min(1, 'Day must not be empty'),
    isActive: z.boolean().optional(),
  }),
});

const updateTimeSlotValidation = z.object({
  body: z.object({
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    day: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const TimeSlotValidations = {
  createTimeSlotValidation,
  updateTimeSlotValidation,
};
