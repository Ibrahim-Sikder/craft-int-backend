import { Schema, model } from 'mongoose';
import { IRoom } from './room.interface';

const roomSchema = new Schema<IRoom>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    capacity: {
      type: Number,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Room = model<IRoom>('Room', roomSchema);
