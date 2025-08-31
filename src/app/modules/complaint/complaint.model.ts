import { Schema, model } from 'mongoose';
import { IComplaint } from './complaint.interface';

const updateSchema = new Schema(
  {
    date: { type: Date, required: true },
    message: { type: String, required: true },
    author: { type: String, required: true },
  },
  { _id: false }
);

const complaintSchema = new Schema<IComplaint>(
  {
    id: { type: Number, required: true, unique: true },
    type: { type: String, enum: ['complaint', 'suggestion'], required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    submitter: { type: String, required: true },
    submitterAvatar: { type: String },
    submitterRole: { type: String, required: true },
    submitDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['pending', 'under_review', 'resolved', 'rejected'],
      default: 'pending',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    assignedTo: { type: String },
    estimatedResolution: { type: String },
    attachments: [{ type: String }],
    updates: [updateSchema],
  },
  { timestamps: true }
);

export const Complaint = model('Complaint', complaintSchema);
