import mongoose, { Schema } from "mongoose";
import { IExpense } from "./expense.interface";

export interface IExpenseItem {
  source: string;
  description?: string;
  amount: number;
}

const ExpenseItemSchema = new Schema<IExpenseItem>(
  {
    source: { type: String, required: true },
    description: { type: String },
    amount: { type: Number, required: true },
  },
  { _id: false }
);

const ExpenseSchema = new Schema<IExpense>(
  {
    category: { type: Schema.Types.ObjectId, ref: 'ExpenseCategory' },
    note: { type: String },
    expenseDate: { type: Date },
    paymentMethod: { type: String },
    status: { type: String, default: 'Pending' },
    expenseItems: { type: [ExpenseItemSchema] },
    totalAmount: { type: Number },
  },
  { timestamps: true }
);

export const Expense = mongoose.model<IExpense>("Expense", ExpenseSchema);
