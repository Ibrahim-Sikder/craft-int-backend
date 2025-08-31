import { Schema, model } from 'mongoose';
import { IExpenseCategory } from './interface';

const expenseCategorySchema = new Schema<IExpenseCategory>(
  {
    name: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

export const ExpenseCategory = model<IExpenseCategory>('ExpenseCategory', expenseCategorySchema);
