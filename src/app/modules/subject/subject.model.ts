import { Schema, model } from 'mongoose';
import { TSubject } from './subject.interface';

const SubjectSchema = new Schema<TSubject>(
  {
    name: {
      type: String,
      required: [true, 'Subject name is required'],
      trim: true,
      unique: true, 
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