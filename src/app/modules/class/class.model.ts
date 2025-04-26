import { Schema, model } from 'mongoose';
import { TClass } from './class.interface';

const classSchema = new Schema<TClass>(
  {
    className: {
      type: String,
      required: true,
      // unique: true,
      // trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Student',
      },
    ],
    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
      },
    ],
    sections: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Section', 
      },
    ],
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
      },
    ],
  },
  {
    timestamps: true, 
  }
);

export const Class = model<TClass>('Class', classSchema);
