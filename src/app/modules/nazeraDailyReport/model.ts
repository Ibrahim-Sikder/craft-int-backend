// nazeraReport.model.ts
import { Schema, model } from "mongoose"
import { INazeraReport } from "./interface"

const DailySessionSchema = new Schema(
  {
    para: { type: String, default: "" },
    page: { type: String, default: "" },
    amount: { type: String, default: "" },
    mistakes: { type: String, default: "" },
  },
  { _id: false }
)

const DayEntrySchema = new Schema(
  {
    morning: { type: DailySessionSchema, required: true },
    afternoon: { type: DailySessionSchema, required: true },
    night: { type: DailySessionSchema, required: true },
    totalRead: { type: String, default: "" },
    duaHadithMasala: { type: String, default: "" },
    mashq: { type: String, enum: ["হ্যাঁ", "না"], default: "না" },
    tajweed: { type: String, default: "" },
  },
  { _id: false }
)

const NazeraReportSchema = new Schema<INazeraReport>(
  {
    teacherName: { type: String, required: true },
    studentName: { type: String, required: true },
    reportDate: { type: String, required: true },
    month: { type: String, required: true },
 
    dailyEntries: {
      saturday: { type: DayEntrySchema, required: true },
      sunday: { type: DayEntrySchema, required: true },
      monday: { type: DayEntrySchema, required: true },
      tuesday: { type: DayEntrySchema, required: true },
      wednesday: { type: DayEntrySchema, required: true },
      thursday: { type: DayEntrySchema, required: true },
      friday: { type: DayEntrySchema, required: true },
    },
    // Weekly totals
    totalPages: { type: Number, default: 0 },
    totalMistakes: { type: Number, default: 0 },
    totalDuas: { type: Number, default: 0 },
    totalHadiths: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export const NazeraReportModel = model<INazeraReport>("NazeraReport", NazeraReportSchema)