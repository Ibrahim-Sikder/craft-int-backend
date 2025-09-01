// loan.model.ts
import mongoose, { Schema, Model } from 'mongoose';
import { TLoan, TRepaymentHistory } from './interface';

const repaymentHistorySchema = new Schema<TRepaymentHistory>(
  {
    date: { type: Date, required: true },
    amount: { type: Number, required: true, min: 0 },
    type: {
      type: String,
      enum: ['principal', 'interest', 'penalty'],
      required: true,
    },
    remainingBalance: { type: Number, required: true, min: 0 },
    note: { type: String },
  },
  { _id: false },
);

const loanSchema = new Schema<TLoan>(
  {
    loan_type: {
      type: String,
      enum: ['taken', 'given'],
      required: true,
    },
    lenderName: { type: String },
    borrowerName: { type: String },
    contactNumber: { type: String },
    loan_amount: {
      type: Number,
      min: 0,
    },
    interest_rate: {
      type: Number,
      min: 0,
      default: 0,
    },
    loan_date: {
      type: Date,
      default: Date.now,
    },
    repayment_start_date: Date,
    repayment_end_date: Date,
    monthly_installment: {
      type: Number,
      min: 0,
    },
    status: {
      type: String,
      enum: ['active', 'paid', 'defaulted', 'overdue'],
      default: 'active',
    },

    // Calculation fields
    totalPaid: {
      type: Number,
      default: 0,
      min: 0,
    },
    remainingBalance: {
      type: Number,
      default: function (this: TLoan) {
        return this.loan_amount;
      },
    },
    totalInterestPaid: {
      type: Number,
      default: 0,
    },
    totalPrincipalPaid: {
      type: Number,
      default: 0,
    },
    daysSinceIssue: {
      type: Number,
      default: 0,
    },
    daysUntilDue: {
      type: Number,
      default: 0,
    },
    repaymentHistory: [repaymentHistorySchema],

    // For handling loan transfers
    originalLoan: {
      type: Schema.Types.ObjectId,
      ref: 'Loan',
    },
    fundedLoans: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Loan',
      },
    ],
  },
  { timestamps: true },
);

// Pre-save middleware to update all calculations
loanSchema.pre('save', function (next) {
  // Calculate total paid, interest paid, and principal paid
  if (this.repaymentHistory && this.repaymentHistory.length > 0) {
    this.totalPaid = this.repaymentHistory.reduce(
      (sum, payment) => sum + payment.amount,
      0,
    );
    this.totalInterestPaid = this.repaymentHistory
      .filter((p) => p.type === 'interest')
      .reduce((sum, payment) => sum + payment.amount, 0);
    this.totalPrincipalPaid = this.repaymentHistory
      .filter((p) => p.type === 'principal')
      .reduce((sum, payment) => sum + payment.amount, 0);
  }

  // Update remaining balance
  this.remainingBalance = this.loan_amount - this.totalPrincipalPaid;

  // Calculate days since issue
  if (this.loan_date) {
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - this.loan_date.getTime());
    this.daysSinceIssue = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // Calculate days until due
  if (this.repayment_end_date) {
    const today = new Date();
    const diffTime = Math.abs(
      this.repayment_end_date.getTime() - today.getTime(),
    );
    this.daysUntilDue = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Update status based on due date and remaining balance
    if (this.remainingBalance <= 0) {
      this.status = 'paid';
    } else if (new Date() > this.repayment_end_date) {
      this.status = 'overdue';
    } else if (
      this.status === 'overdue' &&
      new Date() <= this.repayment_end_date
    ) {
      this.status = 'active';
    }
  }

  // Auto-calculate monthly installment if not provided
  if (
    !this.monthly_installment &&
    this.repayment_start_date &&
    this.repayment_end_date &&
    this.loan_amount &&
    this.interest_rate
  ) {
    const months = Math.ceil(
      (this.repayment_end_date.getTime() -
        this.repayment_start_date.getTime()) /
        (30 * 24 * 60 * 60 * 1000),
    );

    if (months > 0) {
      const monthlyRate = this.interest_rate / 100 / 12;
      this.monthly_installment =
        (this.loan_amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }
  }

  next();
});

export const Loan: Model<TLoan> =
  mongoose.models.Loan || mongoose.model<TLoan>('Loan', loanSchema);
