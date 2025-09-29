// nazeraReport.validation.ts
import { z } from 'zod';

const DailySessionSchema = z.object({
  para: z.string().optional(),
  page: z.string().optional(),
  amount: z.string().optional(),
  mistakes: z.string().optional(),
});

const DayEntrySchema = z.object({
  morning: DailySessionSchema,
  afternoon: DailySessionSchema,
  night: DailySessionSchema,
  totalRead: z.string().optional(),
  duaHadithMasala: z.string().optional(),
  mashq: z.enum(['হ্যাঁ', 'না']).optional(),
  tajweed: z.string().optional(),
});

export const NazeraReportValidation = z.object({
  body: z.object({
    teacherName: z.string().min(1, 'Teacher name is required'),
    studentName: z.string().min(1, 'Student name is required'),
    reportDate: z.string().min(1, 'Report date is required'),
    month: z.string().min(1, 'Month is required'),
   
    dailyEntries: z.object({
      saturday: DayEntrySchema,
      sunday: DayEntrySchema,
      monday: DayEntrySchema,
      tuesday: DayEntrySchema,
      wednesday: DayEntrySchema,
      thursday: DayEntrySchema,
      friday: DayEntrySchema,
    }),
    // Weekly totals fields
    totalPages: z.number().min(0).optional(),
    totalMistakes: z.number().min(0).optional(),
    totalDuas: z.number().min(0).optional(),
    totalHadiths: z.number().min(0).optional(),
  }),
});