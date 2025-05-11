import { Schema, model } from 'mongoose';
import { ISection } from './section.interface';

const sectionSchema = new Schema<ISection>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);



export const Section = model<ISection>('Section', sectionSchema);
