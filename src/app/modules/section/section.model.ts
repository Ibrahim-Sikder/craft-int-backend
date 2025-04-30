import { Schema, model } from 'mongoose';
import { ISection } from './section.interface';

const sectionSchema = new Schema<ISection>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    capacity: {
      type: Number,
    },
    classes: {
      type: Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
    teachers: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher',
    },
    rooms: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
    },
    timeSlots: [
      {
        type: Schema.Types.ObjectId,
        ref: 'TimeSlot',
      },
    ],
    sectionType: {
      type: String,
      required: true,
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



export const Section = model<ISection>('Section', sectionSchema);
