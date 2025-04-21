import { Schema, model } from 'mongoose';
import { ITodayLesson } from './todaylesson.interface';

const todayLessonSchema = new Schema<ITodayLesson>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    attachments: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const TodayLesson = model<ITodayLesson>('TodayLesson', todayLessonSchema);
