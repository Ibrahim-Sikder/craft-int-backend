import { Schema, model } from 'mongoose';
import { IAcademicSession } from './session.interface';

const academicSessionSchema = new Schema<IAcademicSession>(
  {
    sessionName: {
      type: String,
      required: true,
      trim: true,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    workingDays: {
      type: Number,
      default: 0,
    },
    holidays: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


export const AcademicSession = model<IAcademicSession>(
  'AcademicSession',
  academicSessionSchema
);
