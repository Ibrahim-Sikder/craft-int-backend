import { Schema, model } from 'mongoose';
import { IHifzSubject } from './interface';

const hifzSubjectSchema = new Schema<IHifzSubject>(
  {
    name: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const HifzSubject = model<IHifzSubject>('HifzSubject', hifzSubjectSchema);
