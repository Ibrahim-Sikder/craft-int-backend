// investment.model.ts
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
    type: { 
      type: String, 
      enum: ['interest', 'principal', 'dividend', 'capital_gain'],
      required: true 
    },
    note: { type: String }
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
    investmentTo: { type: String, trim: true },
    investmentType: { type: String },
    investorName: { type: String, trim: true },
    investorContact: { type: String },
    incomingType: { type: String },
    returnPolicy: { type: String },
    investmentAmount: {
      type: Number,
      required: true,
      min: [1, 'Amount must be > 0'],
    },
    investmentDate: { type: Date, default: Date.now },
    maturityDate: { type: Date },
    returnRate: { 
      type: Number, 
      min: [0, 'Return rate must be >= 0'],
      default: 0
    },
    status: {
      type: String,
      enum: ['active', 'closed', 'withdrawn', 'matured'],
      default: 'active',
    },
    returnHistory: [returnHistorySchema],
    
    currentValue: {
      type: Number,
      default: function(this: TInvestment) {
        return this.investmentAmount;
      }
    },
    totalReturns: {
      type: Number,
      default: 0
    },
    expectedReturn: {
      type: Number,
      default: function(this: TInvestment) {
        if (!this.returnRate || !this.investmentAmount) return 0;
        return this.investmentAmount * (this.returnRate / 100);
      }
    },
    roi: {
      type: Number,
      default: 0
    },
    annualizedReturn: {
      type: Number,
      default: 0
    },
    daysHeld: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

// Pre-save middleware to update all calculations
investmentSchema.pre('save', function(next) {
  // Calculate total returns
  if (this.returnHistory && this.returnHistory.length > 0) {
    this.totalReturns = this.returnHistory.reduce((sum, returnItem) => sum + returnItem.amount, 0);
    this.currentValue = this.investmentAmount + this.totalReturns;
  }
  
  // Calculate ROI
  if (this.investmentAmount > 0) {
    this.roi = (this.totalReturns / this.investmentAmount) * 100;
  }
  
  // Calculate days held
  if (this.investmentDate) {
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - this.investmentDate.getTime());
    this.daysHeld = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Calculate annualized return if held for at least a day
    if (this.daysHeld > 0) {
      this.annualizedReturn = (Math.pow(1 + (this.roi / 100), 365 / this.daysHeld) - 1) * 100;
    }
  }
  
  // Update status if maturity date has passed
  if (this.maturityDate && new Date() > this.maturityDate && this.status === 'active') {
    this.status = 'matured';
  }
  
  next();
});

export const Investment: Model<TInvestment> =
  mongoose.models.Investment ||
  mongoose.model<TInvestment>('Investment', investmentSchema);