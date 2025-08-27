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
    party: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    loan_amount: {
      type: Number,
      required: true,
      min: [1, "Loan amount must be > 0"],
    },
    interest_rate: {
      type: Number,
      min: [0, "Interest rate must be positive"],
    },
    loan_date: {
      type: Date,
      default: Date.now,
    },
    repayment_start_date: Date,
    repayment_end_date: Date,
    monthly_installment: {
      type: Number,
      min: [0, "Installment must be positive"],
    },
    status: {
      type: String,
      enum: ["active", "paid", "defaulted"],
      default: "active",
    },
  },
  { timestamps: true }
);

export const Loan: Model<TLoan> =
  mongoose.models.Loan || mongoose.model<TLoan>("Loan", loanSchema);
