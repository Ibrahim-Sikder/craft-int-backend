import { Schema, model } from "mongoose"
import type { IClassReport, IStudentEvaluation } from "./classreport.interface"

const studentEvaluationSchema = new Schema<IStudentEvaluation>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
    lessonEvaluation: {
      type: String,
      enum: ["পড়া শিখেছে", "আংশিক শিখেছে", "পড়া শিখেনি", "অনুপস্থিত", "পাঠ নেই"],
    },
    handwriting: {
      type: String,
      enum: ["লিখেছে", "আংশিক লিখেছে", "লিখেনি", "কাজ নেই", "অনুপস্থিত"],
    },
    attendance: {
      type: String,
      enum: ["উপস্থিত", "অনুপস্থিত", "ছুটি"],
    },
    parentSignature: {
      type: Boolean,
    },
    comments: {
      type: String,
      // Add index for better performance when filtering by comments
      index: true,
    },
    hasComments: {
      type: Boolean,
      default: false, // default false
    },
  },
  { _id: false },
)

const classReportSchema = new Schema<IClassReport>(
  {
    teachers: {
      type: String,
      required: true,
    },
    classes: {
      type: String,
      required: true,
    },
    subjects: {
      type: String,
      required: true,
    },
    hour: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    studentEvaluations: {
      type: [studentEvaluationSchema],
      required: true,
    },
    todayLesson: {
      type: Schema.Types.ObjectId,
      ref: "TodayLesson",
    },
    homeTask: {
      type: Schema.Types.ObjectId,
      ref: "TodayTask",
    },
    noTaskForClass: {
      type: Boolean,
    },
    lessonEvaluationTask: {
      type: Boolean,
    },
    handwrittenTask: {
      type: Boolean,
    },
    hasComments: {
    type: Schema.Types.Mixed, 
    default: false,          
  },
  },
  {
    timestamps: true,
  },
)

// Add compound indexes for better query performance
classReportSchema.index({ teachers: 1, classes: 1, subjects: 1 })
classReportSchema.index({ date: 1, hour: 1 })
classReportSchema.index({ createdAt: -1 })

// Add index for comments filtering
classReportSchema.index({ "studentEvaluations.comments": 1 })

// Add text index for better text search
classReportSchema.index({
  teachers: "text",
  classes: "text",
  subjects: "text",
  hour: "text",
})

export const ClassReport = model<IClassReport>("ClassReport", classReportSchema)
