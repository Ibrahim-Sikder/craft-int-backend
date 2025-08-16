import { Schema, model } from 'mongoose';
import { IHifzClass } from './interface';

const hifzClassSchema = new Schema<IHifzClass>(
  {
    name: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

export const HifzClass = model<IHifzClass>('HifzClass', hifzClassSchema);
