import { Schema, model } from 'mongoose';
import { TSubject } from './subject.interface';

const SubjectSchema = new Schema<TSubject>(
  {
    name: {
      type: String,
      required: [true, 'Subject name is required'],
    },

    paper: {
      type: String,
      default: '',
    }
   
  },
  {
    timestamps: true,
  }
);

export const Subject = model('Subject', SubjectSchema);