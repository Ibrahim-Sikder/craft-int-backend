import { Schema, model } from 'mongoose';
import { IIncomeCategory } from './interface';

const incomeCategorySchema = new Schema<IIncomeCategory>(
  {
    name: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

export const IncomeCategory = model<IIncomeCategory>('IncomeCategory', incomeCategorySchema);
