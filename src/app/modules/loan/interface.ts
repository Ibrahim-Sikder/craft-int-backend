
import { Document } from "mongoose";

export interface TLoan extends Document {
  lenderName:string;
  borrowerName:string;
  contactNumber:number;
  loan_type: "taken" | "given";
  loan_amount: number;
  interest_rate?: number;
  loan_date: Date;
  repayment_start_date?: Date;
  repayment_end_date?: Date;
  monthly_installment?: number;
  status: "active" | "paid" | "defaulted";
}
