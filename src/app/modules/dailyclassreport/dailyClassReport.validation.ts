import { z } from 'zod';

const reportRowSchema = z.object({
  subject: z
    .string({ required_error: 'Subject is required' })
    .min(1, 'Subject must not be empty'),
  class: z
    .string({ required_error: 'Class is required' })
    .min(1, 'Class must not be empty'),
  fullyLearned: z
    .number({ required_error: 'Fully learned count is required' })
    .min(0, 'Fully learned must be 0 or more'),
  partiallyLearned: z
    .number({ required_error: 'Partially learned count is required' })
    .min(0, 'Partially learned must be 0 or more'),
  notLearned: z
    .number({ required_error: 'Not learned count is required' })
    .min(0, 'Not learned must be 0 or more'),
  lessonDetails: z
    .string({ required_error: 'Lesson details are required' })
    .min(1, 'Lesson details must not be empty'),
  homework: z
    .string({ required_error: 'Homework is required' })
    .min(1, 'Homework must not be empty'),
  diaryCompleted: z.enum(['হ্যাঁ', 'না'], {
    required_error: 'Diary completed status is required',
  }),
});

const createReportValidation = z.object({
  body: z.object({
    teacherName: z
      .string({ required_error: 'Teacher name is required' })
      .min(1, 'Teacher name must not be empty'),
    date: z
      .string({ required_error: 'Date is required' })
      .min(1, 'Date must not be empty'),
      classes : z
      .array(reportRowSchema, { required_error: 'At least one row is required' })
      .min(1, 'At least one row must be provided'),
  }),
});

const updateReportValidation = z.object({
  body: z.object({
    teacherName: z.string().min(1, 'Teacher name must not be empty').optional(),
    date: z.string().min(1, 'Date must not be empty').optional(),
    classes: z.array(reportRowSchema).optional(),
  }),
});

export const DailyClassReportValidations = {
  createReportValidation,
  updateReportValidation,
};
