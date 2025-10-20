import { Schema, model } from 'mongoose';
import { IAmparaDailyReportModel } from './interface';

const DailyEntrySchema = new Schema({
  sobok: {
    para: { type: String, default: '' },
    page: { type: String, default: '' },
    amount: { type: String, default: '' },
    wrong: { type: String, default: '' }
  },
  sabakSeven: {
    para: { type: String, default: '' },
    page: { type: String, default: '' },
    amount: { type: String, default: '' },
    wrong: { type: String, default: '' }
  },
  sabakAmukta: {
    para: { type: String, default: '' },
    page: { type: String, default: '' },
    amount: { type: String, default: '' },
    wrong: { type: String, default: '' }
  },
  satSobok: {
    para: { type: String, default: '' },
    page: { type: String, default: '' },
    amount: { type: String, default: '' },
    wrong: { type: String, default: '' }
  },
  tilawaAmount: { type: String, default: '' },
  mashq: { type: String, default: '' },
  tajweed: { type: String, default: '' },
  teacherSignature: { type: String, default: '' },
  thursdayWeeklyRevision: { type: String, default: '' }
});

const AmparaDailyReportSchema = new Schema(
  {
    teacherName: { type: String, required: true },
    studentName: { type: String, required: true },
    reportDate: { type: String, required: true },
    month: { type: String, required: true },
    weeklyTarget: { type: String, default: '' },
    dailyEntries: {
      saturday: { type: DailyEntrySchema, default: () => ({}) },
      sunday: { type: DailyEntrySchema, default: () => ({}) },
      monday: { type: DailyEntrySchema, default: () => ({}) },
      tuesday: { type: DailyEntrySchema, default: () => ({}) },
      wednesday: { type: DailyEntrySchema, default: () => ({}) },
      thursday: { type: DailyEntrySchema, default: () => ({}) },
      friday: { type: DailyEntrySchema, default: () => ({}) }
    },
    weeklySummary: {
      totalSobok: { type: Number, default: 0 },
      totalSatSobok: { type: Number, default: 0 },
      totalSabakAmukta: { type: Number, default: 0 },
      totalTilawat: { type: Number, default: 0 },
      totalRevision: { type: Number, default: 0 }
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true,
  }
);

export const AmparaDailyReportModel = model<IAmparaDailyReportModel>('AmparaDailyReport', AmparaDailyReportSchema);