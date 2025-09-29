import { Schema, model } from "mongoose";
import { IQaidaDailyReport } from "./interface";

const dayEntrySchema = new Schema({
  hadithNumber: { type: String, default: "" },
  duaNumber: { type: String, default: "" },
  tajweedSubject: { type: String, default: "" },
  qaidaPage: { type: String, default: "" },
  pageAmount: { type: String, default: "" },
  hadithDuaRevision: { type: String, default: "" },
  duaRevision: { type: String, default: "" },
  tajweedRevision: { type: String, default: "" },
  qaidaRevision: { type: String, default: "" },
  teacherSignature: { type: String, default: "" },
  comment: { type: String, default: "" },
});

const dailyEntriesSchema = new Schema({
  saturday: { type: dayEntrySchema, default: () => ({}) },
  sunday: { type: dayEntrySchema, default: () => ({}) },
  monday: { type: dayEntrySchema, default: () => ({}) },
  tuesday: { type: dayEntrySchema, default: () => ({}) },
  wednesday: { type: dayEntrySchema, default: () => ({}) },
  thursday: { type: dayEntrySchema, default: () => ({}) },
  friday: { type: dayEntrySchema, default: () => ({}) },
});

const qaidaDailyReportSchema = new Schema<IQaidaDailyReport>(
  {
    studentName: { type: String, required: true },
    teacherName: { type: String, required: true },
    reportDate: { type: Date, required: true },
    month: { type: String, required: true },
    weeklyTarget: { type: String, default: "" },
    dailyEntries: { type: dailyEntriesSchema, required: true },
  },
  {
    timestamps: true,
  }
);

export const QaidaDailyReport = model<IQaidaDailyReport>(
  "QaidaDailyReport",
  qaidaDailyReportSchema
);