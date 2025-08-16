import { Schema, model } from 'mongoose';
import { IHifzClassReport } from './interface';

const hifzClassReportSchema = new Schema<IHifzClassReport>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const HifzClassReport = model<IHifzClassReport>('HifzClassReport', hifzClassReportSchema);
