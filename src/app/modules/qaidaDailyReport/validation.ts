import { z } from "zod";

const dayEntrySchema = z.object({
  hadithNumber: z.string().optional(),
  duaNumber: z.string().optional(),
  tajweedSubject: z.string().optional(),
  qaidaPage: z.string().optional(),
  pageAmount: z.string().optional(),
  hadithDuaRevision: z.string().optional(),
  duaRevision: z.string().optional(),
  tajweedRevision: z.string().optional(),
  qaidaRevision: z.string().optional(),
  teacherSignature: z.string().optional(),
  comment: z.string().optional(),
});

const dailyEntriesSchema = z.object({
  saturday: dayEntrySchema,
  sunday: dayEntrySchema,
  monday: dayEntrySchema,
  tuesday: dayEntrySchema,
  wednesday: dayEntrySchema,
  thursday: dayEntrySchema,
  friday: dayEntrySchema,
});

export const createQaidaDailyReportSchema = z.object({
  body: z.object({
    studentName: z.string({ required_error: "Student name is required" }),
    reportDate: z.string({ required_error: "Report date is required" }),
    month: z.string({ required_error: "Month is required" }),
    weeklyTarget: z.string().optional(),
    dailyEntries: dailyEntriesSchema,
  }),
});

export const updateQaidaDailyReportSchema = z.object({
  body: z.object({
    studentName: z.string().optional(),
    reportDate: z.string().optional(),
    month: z.string().optional(),
    weeklyTarget: z.string().optional(),
    dailyEntries: dailyEntriesSchema.partial(),
  }),
});