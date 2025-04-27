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
    classId: {
      type: Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher',
    },
    roomId: {
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
    color: {
      type: String,
      default: '#6366F1',
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
