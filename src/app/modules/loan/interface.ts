import mongoose from "mongoose";

export interface TRepaymentHistory {
  date: Date;
  amount: number;
  type: 'principal' | 'interest' | 'penalty';
  remainingBalance: number;
  note?: string;
}

export interface TLoan extends Document {
  loan_type: "taken" | "given";
  lenderName: string;
  borrowerName: string;
  contactNumber: string;
  loan_amount: number;
  interest_rate: number;
  loan_date: Date;
  repayment_start_date: Date;
  repayment_end_date: Date;
  monthly_installment: number;
  status: "active" | "paid" | "defaulted" | "overdue";
  
  // Calculation fields
  totalPaid: number;
  remainingBalance: number;
  totalInterestPaid: number;
  totalPrincipalPaid: number;
  daysSinceIssue: number;
  daysUntilDue: number;
  repaymentHistory: TRepaymentHistory[];
  
  // For loan transfer scenario
  originalLoan?: mongoose.Types.ObjectId;
  fundedLoans?: mongoose.Types.ObjectId[];
}