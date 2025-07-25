import type { Types } from "mongoose"

export interface IStudentEvaluation {
  studentId: Types.ObjectId
  lessonEvaluation: "পড়া শিখেছে" | "আংশিক শিখেছে" | "পড়া শিখেনি" | "অনুপস্থিত" | "পাঠ নেই"
  handwriting: "লিখেছে" | "আংশিক লিখেছে" | "লিখেনি" | "কাজ নেই" | "অনুপস্থিত"
  attendance: "উপস্থিত" | "অনুপস্থিত" | "ছুটি" | "অনুপস্থিত"
  parentSignature: boolean
  comments?: string
  hasComments?: boolean | string
}

export interface IClassReport {
  teachers: string
  classes: string
  subjects: string
  hour: string
  date: Date
  studentEvaluations: IStudentEvaluation[]
  todayLesson?: Types.ObjectId[]
  homeTask?: Types.ObjectId[]
  noTaskForClass: boolean
  handwrittenTask: boolean
  lessonEvaluationTask: boolean
    hasComments?: boolean | string
}

// Add interface for query parameters
export interface IClassReportQuery {
  limit?: number
  page?: number
  searchTerm?: string
  className?: string
  subject?: string
  teacher?: string
  date?: string
  hour?: string
  lessonEvaluation?: string
  handwriting?: string
  startDate?: string
  endDate?: string
  hasComments?: boolean | string
}

// Add interface for comments statistics
export interface ICommentsStats {
  totalComments: number
  reportsWithComments: number
  studentsWithComments: number
}
