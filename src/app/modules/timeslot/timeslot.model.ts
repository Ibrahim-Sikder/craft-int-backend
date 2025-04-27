import { Schema, model } from 'mongoose';
import { ITimeSlot } from './timeslot.interface';

const timeSlotSchema = new Schema<ITimeSlot>(
  {
    title: {
      type: String,
    },
    day: {
      type: String,
      required: true,
      enum: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
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

export const TimeSlot = model<ITimeSlot>('TimeSlot', timeSlotSchema);
