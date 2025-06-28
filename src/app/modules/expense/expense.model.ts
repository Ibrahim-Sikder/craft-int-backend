import { Schema, model } from 'mongoose'
import { IExpense } from './expense.interface'

const expenseSchema = new Schema<IExpense>(
  {
    category: {
      type: String,
      enum: ['utilities', 'salary', 'supplies', 'transport', 'maintenance'],
      required: true,
      index: true, // 🔍 Index for faster filter
    },
    description: {
      type: String,
      required: true,
      trim: true,
      text: true, // 🔍 Text index for search
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      index: true, // 🔍 for date range queries
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'bank', 'check', 'mobile'],
      required: true,
    },
    status: {
      type: String,
      enum: ['Paid', 'Pending', 'Overdue'],
      default: 'Paid',
      index: true, // 🔍 for status filtering
    },
  },
  { timestamps: true }
)

// Compound index if you often filter by multiple fields
expenseSchema.index({ category: 1, date: -1 })

export const Expense = model<IExpense>('Expense', expenseSchema)
