// loan.model.ts
import mongoose, { Schema, Model } from "mongoose";
import { TLoan } from "./interface";

const loanSchema = new Schema<TLoan>(
  {
    loan_type: {
      type: String,
      enum: ["taken", "given"],
      required: true,
    },
    lenderName: {
      type: String
    },
    borrowerName: {
      type: String
    },
    loan_amount: {
      type: Number,
    },
    contactNumber: {
      type: Number,
    },
    interest_rate: {
      type: Number,
    },
    loan_date: {
      type: Date,
      default: Date.now,
    },
    repayment_start_date: Date,
    repayment_end_date: Date,
    monthly_installment: {
      type: Number,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Loan: Model<TLoan> =
  mongoose.models.Loan || mongoose.model<TLoan>("Loan", loanSchema);
