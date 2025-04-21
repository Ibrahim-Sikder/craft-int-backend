import { Schema, model } from 'mongoose';
import { IHomeTask } from './hometask.interface';

const homeTaskSchema = new Schema<IHomeTask>(
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
    dueDate: {
      type: Date,
    },
    attachments: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export const HomeTask = model<IHomeTask>('HomeTask', homeTaskSchema);
