import { z } from 'zod';

const updateSchema = z.object({
  date: z.string(),
  message: z.string(),
  author: z.string(),
});

const complaintSchema = z.object({
  body:z.object({
    id: z.number(),
  type: z.enum(['complaint', 'suggestion']),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  submitter: z.string(),
  submitterAvatar: z.string().optional(),
  submitterRole: z.string(),
  submitDate: z.string(),
  status: z.enum(['pending', 'under_review', 'resolved', 'rejected']).default('pending'),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  upvotes: z.number().default(0),
  downvotes: z.number().default(0),
  comments: z.number().default(0),
  rating: z.number().default(0),
  assignedTo: z.string(),
  estimatedResolution: z.string().optional(),
  attachments: z.array(z.string()).optional(),
  updates: z.array(updateSchema).optional(),
  })
});

const updateComplaintSchema = complaintSchema.partial();

export const ComplaintValidation = {
  createComplaint: complaintSchema,
  updateComplaint: updateComplaintSchema,
};
