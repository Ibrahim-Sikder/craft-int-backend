import mongoose, { Schema, Model } from 'mongoose';
import { TInvestment, TReturnHistory } from './interface';

const returnHistorySchema = new Schema<TReturnHistory>(
  {
    date: { type: Date, required: true },
    amount: {
      type: Number,
      required: true,
      min: [0, 'Return amount must be >= 0'],
    },
  },
  { _id: false },
);

const investmentSchema = new Schema<TInvestment>(
  {
    investmentCategory: {
      type: String,
      enum: ['outgoing', 'incoming'],
      required: true,
    },

    // Outgoing Investment fields
    investmentTo: { type: String, trim: true },
    investmentType: { type: String },

    // Incoming Investment fields
    investorName: { type: String, trim: true },
    investorContact: { type: String },
    incomingType: {
      type: String,
    },
    returnPolicy: { type: String },

    // Common fields
    investmentAmount: {
      type: Number,
      required: true,
      min: [1, 'Amount must be > 0'],
    },
    investmentDate: { type: Date, default: Date.now },
    maturityDate: { type: Date },
    returnRate: { type: Number, min: [0, 'Return rate must be >= 0'] },
    status: {
      type: String,
      enum: ['active', 'closed', 'withdrawn'],
      default: 'active',
    },
    returnHistory: [returnHistorySchema],
  },
  { timestamps: true },
);

export const Investment: Model<TInvestment> =
  mongoose.models.Investment ||
  mongoose.model<TInvestment>('Investment', investmentSchema);
