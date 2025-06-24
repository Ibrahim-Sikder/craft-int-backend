import { z } from 'zod';

const notificationSchema = z.object({
  body:z.object({
    id: z.number(),
  type: z.enum(['assignment', 'event', 'announcement']),
  title: z.string(),
  message: z.string(),
  sender: z.string(),
  senderAvatar: z.string().optional(),
  timestamp: z.string(),
  isRead: z.boolean().default(false),
  isStarred: z.boolean().default(false),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  category: z.enum(['Academic', 'Events', 'General']).default('General'),
  })
});

const updateNotificationSchema = notificationSchema.partial();

export const NotificationValidation = {
  createNotification: notificationSchema,
  updateNotification: updateNotificationSchema,
};
