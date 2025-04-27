import { z } from 'zod';

const createHomeTaskValidation = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(1, 'Title cannot be empty'),
    description: z
      .string({
        required_error: 'Description is required',
      })
      .min(1, 'Description cannot be empty'),
    dueDate: z
      .string()
      .datetime({ message: 'Invalid date format' })
      .optional(),
    attachments: z.array(z.string()).optional(),
  }),
});

const updateHomeTaskValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    dueDate: z.string().datetime().optional(),
    attachments: z.array(z.string()).optional(),
  }),
});

export const HomeTaskValidations = {
  createHomeTaskValidation,
  updateHomeTaskValidation,
};
