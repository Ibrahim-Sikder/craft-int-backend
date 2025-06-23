import { z } from 'zod';

const createFeedbackValidation = z.object({
  body: z.object({
    type: z.enum(['complaint', 'idea', 'suggestion'], {
      required_error: 'Type is required',
    }),
    category: z.string().min(1, 'Category is required'),
    priority: z.enum(['low', 'medium', 'high', 'urgent'], {
      required_error: 'Priority is required',
    }),
    title: z.string().min(5, 'Title must be at least 5 characters'),
    description: z.string(),
    department: z.string().optional(),
    attachments: z.string().optional(),
  }),
});

const updateFeedbackValidation = z.object({
  body: z.object({
    type: z.enum(['complaint', 'idea', 'suggestion']).optional(),
    category: z.string().optional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    department: z.string().optional(),
    attachments: z.string().optional(),
  }),
});

export const FeedbackValidations = {
  createFeedbackValidation,
  updateFeedbackValidation,
};
