// hifzReport.model.ts
import { Schema, model } from "mongoose"
import { IHifzClassReport } from "./interface"

const StudentInfoSchema = new Schema(
  {
    studentName: { type: String, required: true, trim: true },
    studentId:   { type: String, required: true, trim: true },
    class:       { type: String, required: true, trim: true },
    date:        { type: String, required: true },
    day:         { type: String, required: true },
  },
  { _id: false }
)

const ReportRowSchema = new Schema(
  {
    id:               { type: String, required: true },
    section:          { type: String },
    title:            { type: String, required: true },
    lesson:           { type: String, default: "" }, 
    dailyFoundation:  { type: String, default: "" },
    weeklyFoundation: { type: String, default: "" },
    teacherSignature: { type: String, default: "" },
  },
  { _id: false }
)

const HifzReportSchema = new Schema<IHifzClassReport>(
  {
    studentInfo: { type: StudentInfoSchema, required: true },
    reportRows:  { type: [ReportRowSchema], required: true },
    createdAt:   { type: String, default: () => new Date().toISOString() },
  },
  { timestamps: true }
)

export const HifzReport = model<IHifzClassReport>("HifzReport", HifzReportSchema)
