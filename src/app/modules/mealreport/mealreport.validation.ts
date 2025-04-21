import { z } from 'zod';
import mongoose from 'mongoose';

// Enum for meal types
export enum MealType {
  BREAKFAST = 'BREAKFAST',
  LUNCH = 'LUNCH',
  DINNER = 'DINNER',
}

const createMealReportValidation = z.object({
  body: z.object({
    date: z
      .string({
        required_error: 'Date is required',
      })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
      }),

    mealType: z.nativeEnum(MealType, {
      required_error: 'Meal type is required',
      invalid_type_error: 'Invalid meal type',
    }),

    students: z
      .array(
        z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
          message: 'Invalid student ID',
        })
      )
      .min(1, { message: 'At least one student is required' }),
  }),
});

const updateMealReportValidation = z.object({
  body: z.object({
    date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
      })
      .optional(),

    mealType: z.nativeEnum(MealType).optional(),

    students: z
      .array(
        z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
          message: 'Invalid student ID',
        })
      )
      .optional(),
  }),
});

export const MealReportValidations = {
  createMealReportValidation,
  updateMealReportValidation,
};
