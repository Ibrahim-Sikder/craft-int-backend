
import { Document, Types } from "mongoose";

export interface TLoan extends Document {
  loan_type: "taken" | "given";
  party: Types.ObjectId;
  loan_amount: number;
  interest_rate?: number;
  loan_date: Date;
  repayment_start_date?: Date;
  repayment_end_date?: Date;
  monthly_installment?: number;
  status: "active" | "paid" | "defaulted";
}
