import { Document } from "mongoose";

export interface TReturnHistory {
  date: Date;
  amount: number;
  type: 'interest' | 'principal' | 'dividend' | 'capital_gain';
  note?: string;
}

export interface TInvestment extends Document {
  investmentCategory: "outgoing" | "incoming";
  
  // Outgoing Investment
  investmentTo?: string;
  investmentType?: "fixed_deposit" | "share" | "bond" | "others";
  
  // Incoming Investment
  investorName?: string;
  investorContact?: string;
  incomingType?: "donation_fund" | "share" | "partnership" | "others";
  returnPolicy?: string;

  // Common
  investmentAmount: number;
  investmentDate: Date;
  maturityDate?: Date;
  closedDate?: Date;
  returnRate?: number;
  status: "active" | "closed" | "withdrawn" | "matured";
  returnHistory?: TReturnHistory[];
  
  // Calculation fields
  currentValue: number;
  totalReturns: number;
  expectedReturn: number;
  roi: number; // Return on Investment
  annualizedReturn: number;
  daysHeld: number;
}