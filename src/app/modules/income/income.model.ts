import { Schema, model } from "mongoose"
import { IIncome } from "./income.interface"

const incomeSchema = new Schema<IIncome>(
  {
    source: {
      type: String,
      enum: ["tuition", "grant", "donation", "admission", "event"],
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
)

export const Income = model<IIncome>("Income", incomeSchema)
