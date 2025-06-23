import { z } from 'zod';

export const announcementValidationSchema = z.object({
  body: z.object({
    id: z.number(),
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    category: z.string().min(1, 'Category is required'),
    author: z.string().min(1, 'Author is required'),
    authorAvatar: z.string().optional(),
    publishDate: z.coerce.date(),
    isPinned: z.boolean(),
    isStarred: z.boolean(),
    views: z.number().nonnegative(),
    attachments: z.array(z.string()).optional(),
    image: z.string().optional(),
    priority: z.enum(['low', 'medium', 'high']),
  }),
});
