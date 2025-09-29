import { z } from 'zod';

const DailyEntrySchema = z.object({
  sobok: z.object({
    para: z.string().optional(),
    page: z.string().optional(),
  }).optional(),
  sabakSeven: z.object({
    para: z.string().optional(),
    page: z.string().optional(),
  }).optional(),
  sabakAmukta: z.object({
    para: z.string().optional(),
    page: z.string().optional(),
  }).optional(),
  satSobok: z.object({
    para: z.string().optional(),
    page: z.string().optional(),
    amount: z.string().optional(),
    wrong: z.string().optional(),
  }).optional(),
  tilawaAmount: z.string().optional(),
  mashq: z.string().optional(),
  tajweed: z.string().optional(),
  teacherSignature: z.string().optional(),
  thursdayWeeklyRevision: z.string().optional(),
});

export const SobokiDailyReportValidation = z.object({
  body: z.object({
    teacherName: z.string().min(1, 'Teacher name is required'),
    studentName: z.string().min(1, 'Student name is required'),
    reportDate: z.string().min(1, 'Report date is required'),
    month: z.string().min(1, 'Month is required'),
    weeklyTarget: z.string().optional(),
    dailyEntries: z.object({
      saturday: DailyEntrySchema,
      sunday: DailyEntrySchema,
      monday: DailyEntrySchema,
      tuesday: DailyEntrySchema,
      wednesday: DailyEntrySchema,
      thursday: DailyEntrySchema,
      friday: DailyEntrySchema,
    }),
  }),
});