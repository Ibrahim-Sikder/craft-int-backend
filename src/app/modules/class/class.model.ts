import { Schema, model } from 'mongoose';
import { TClass } from './class.interface';

const classSchema = new Schema<TClass>(
  {
    className: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Class = model<TClass>('Class', classSchema);
