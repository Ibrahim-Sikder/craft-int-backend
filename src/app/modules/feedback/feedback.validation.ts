import { z } from 'zod';

const createFeedbackValidation = z.object({
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

const updateFeedbackValidation = z.object({
  body: z.object({
    type: z.enum(['complaint', 'idea', 'suggestion']).optional(),
    category: z.string().optional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    department: z.string().optional(),
 attachments: z.array(z.string()).optional(),
  }),
});

export const FeedbackValidations = {
  createFeedbackValidation,
  updateFeedbackValidation,
};
