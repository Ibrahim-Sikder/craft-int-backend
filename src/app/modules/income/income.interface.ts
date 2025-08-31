import { ObjectId } from "mongoose";

export interface IncomeItem {
  source: string;
  description: string;
  amount: string;
}

export interface IIncome {
  category: ObjectId;
  note: string;
  incomeDate: Date;
  paymentMethod: string;
  status: string;
  incomeItems: IncomeItem[];
  totalAmount:number
}
