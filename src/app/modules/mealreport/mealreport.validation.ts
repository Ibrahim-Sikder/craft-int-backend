import { z } from 'zod';
import mongoose from 'mongoose';
import { MealType } from './mealreport.interface';

const mealParticipantSchema = z.object({
  personId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid person ID',
  }),
  mealTypes: z
    .array(z.nativeEnum(MealType))
    .min(1, { message: 'At least one meal type is required' }),
  mealCount: z
    .number()
    .min(1, { message: 'Minimum 1 meal is required' })
    .max(3, { message: 'Maximum 3 meals allowed' }),
});

export const createMealReportValidation = z.object({
  body: z.object({
    date: z.string({
      required_error: 'Date is required',
    }),
    students: z
      .array(mealParticipantSchema)
      .min(1, { message: 'At least one student is required' }),
    teachers: z
      .array(mealParticipantSchema)
      .min(1, { message: 'At least one teacher is required' }),
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
        }),
      )
      .optional(),
  }),
});

export const MealReportValidations = {
  createMealReportValidation,
  updateMealReportValidation,
};
