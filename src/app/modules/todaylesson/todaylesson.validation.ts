import { z } from 'zod';

export const createTodayLessonValidation = z.object({
  body: z.object({
    lessonContent: z
    .string({
      required_error: "আজকের পাঠের বিষয়বস্তু আবশ্যক।",
    })
  })
});


const updateTodayLessonValidation = z.object({
  body: z.object({
    lessonContent: z
    .string().optional(),
  })
});

export const TodayLessonValidations = {
  createTodayLessonValidation,
  updateTodayLessonValidation,
};
