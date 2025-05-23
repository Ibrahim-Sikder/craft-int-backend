import { Schema, model } from 'mongoose';
import { ISection } from './section.interface';

const sectionSchema = new Schema<ISection>(
  {
    name: {
      type: String,

    }
  },
  {
    timestamps: true,
  }
);



export const Section = model<ISection>('Section', sectionSchema);
