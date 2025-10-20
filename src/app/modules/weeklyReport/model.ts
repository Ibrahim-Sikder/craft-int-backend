// models/weeklyReport.model.ts
import { Schema, model, Document } from "mongoose";

export interface IReportRow {
  label: string;
  values: string[];
}

export interface IWeeklyReport extends Document {
  studentName: string;
  date: Date;
  month: string;
  reportType: "nazera" | "ampara" | "hifz" | "qaida";
  rows: IReportRow[];
}

const ReportRowSchema = new Schema<IReportRow>({
  label: { type: String, required: true },
  values: { type: [String], required: true, default: [] },
});

const WeeklyReportSchema = new Schema<IWeeklyReport>(
  {
    studentName: { type: String, required: true },
    date: { type: Date, required: true },
    month: { type: String, required: true },
    reportType: {
      type: String,
      enum: ["nazera", "ampara", "hifz", "qaida"],
      required: true,
    },
    rows: { type: [ReportRowSchema], required: true },
  },
  { timestamps: true }
);

export const WeeklyReport = model<IWeeklyReport>(
  "WeeklyReport",
  WeeklyReportSchema
);
