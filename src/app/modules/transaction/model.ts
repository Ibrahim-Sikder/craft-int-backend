// transaction.model.ts
import mongoose, { Schema, Model } from "mongoose";
import { TTransaction } from "./interface";

const transactionSchema = new Schema<TTransaction>(
  {
    account_type: {
      type: String,
      enum: ["asset", "liability", "equity", "income", "expense"],
      required: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    description: String,
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount must be positive"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    reference: {
      model: String,
      id: String,
    },
  },
  { timestamps: true }
);

export const Transaction: Model<TTransaction> =
  mongoose.models.Transaction ||
  mongoose.model<TTransaction>("Transaction", transactionSchema);
