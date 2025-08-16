import { Schema, model } from 'mongoose';
import { IHifzSubject } from './hifzSubject.interface';

const hifzSubjectSchema = new Schema<IHifzSubject>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const HifzSubject = model<IHifzSubject>('HifzSubject', hifzSubjectSchema);
