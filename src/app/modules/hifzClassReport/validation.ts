// hifzReport.validation.ts
import { z } from "zod"

export const studentInfoValidation = z.object({
  studentName: z.string(),
  studentId:   z.string(),
  class:       z.string(),
  date:        z.string(),
})

export const reportRowValidation = z.object({
  id:               z.string(),
  section:          z.string().optional(),
  title:            z.string(),
  lesson:           z.string().optional().default(""),
  dailyFoundation:  z.string().optional().default(""),
  weeklyFoundation: z.string().optional().default(""),
  teacherSignature: z.string().optional().default(""),
})

export const hifzReportValidation = z.object({
  studentInfo: studentInfoValidation,
  reportRows:  z.array(reportRowValidation),
  createdAt:   z.string().optional(),
})

export type HifzReportValidationType = z.infer<typeof hifzReportValidation>
