import { z } from 'zod';

const createTodayLessonValidation = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(1, 'Title must not be empty'),

    description: z
      .string({
        required_error: 'Description is required',
      })
      .min(1, 'Description must not be empty'),

    attachments: z.array(z.string()).optional(),
  }),
});

const updateTodayLessonValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    attachments: z.array(z.string()).optional(),
  }),
});

export const TodayLessonValidations = {
  createTodayLessonValidation,
  updateTodayLessonValidation,
};
