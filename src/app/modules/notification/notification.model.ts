import { model, Schema } from 'mongoose';
import { INotification } from './notification.interface';

const notificationSchema = new Schema<INotification>(
  {
    id: { type: Number, required: true, unique: true },
    type: {
      type: String,
      enum: ['assignment', 'event', 'announcement'],
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    sender: { type: String, required: true },
    senderAvatar: { type: String },
    timestamp: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    isStarred: { type: Boolean, default: false },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    category: {
      type: String,
      enum: ['Academic', 'Events', 'General'],
      default: 'General',
    },
  },
  { timestamps: true }
);

export const Notification = model('Notification', notificationSchema);
