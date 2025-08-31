import { ObjectId } from "mongoose";

export interface ExpenseItem {
  source: string;
  description?: string;
  amount: string;
}

export interface IExpense {
  category: ObjectId;
  note: string;
  expenseDate: Date;
  paymentMethod: string;
  status: string;
  expenseItems: ExpenseItem[];
  totalAmount: number;
}
