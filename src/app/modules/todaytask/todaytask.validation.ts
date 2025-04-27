import { z } from 'zod';

export const createTodayTaskValidation = z.object({
  body: z.object({
    taskContent: z
      .string({
        required_error: "বাড়ির কাজের বিষয়বস্তু আবশ্যক।", 
      })
      .min(5, "বাড়ির কাজের বিষয়বস্তু কমপক্ষে ৫ অক্ষরের হতে হবে।"),
    dueDate: z
      .string()
  }),
});

const updateTodayTaskValidation = z.object({
  body: z.object({
    taskContent: z
      .string()
      .optional(),
    dueDate: z
      .string()
      .optional(), 
  }),
});

export const TodayTaskValidations = {
  createTodayTaskValidation,
  updateTodayTaskValidation,
};
