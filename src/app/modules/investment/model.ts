// investment.model.ts
import mongoose, { Schema, Model } from "mongoose";
import { TInvestment } from "./interface";
const investmentSchema = new Schema<TInvestment>(
  {
    investment_type: {
      type: String,
      enum: ["short_term", "long_term"],
      required: true,
    },
    investment_name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [1, "Amount must be > 0"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    expected_return: {
      type: Number,
      min: [0, "Expected return must be positive"],
    },
    maturity_date: Date,
    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active",
    },
  },
  { timestamps: true }
);

export const Investment: Model<TInvestment> =
  mongoose.models.Investment ||
  mongoose.model<TInvestment>("Investment", investmentSchema);
