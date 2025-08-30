import { Document } from "mongoose";

export interface TReturnHistory {
  date: Date;
  amount: number;
}

export interface TInvestment extends Document {
  investmentCategory: "outgoing" | "incoming"; // <-- New field

  // Outgoing Investment
  investmentTo?: string; // Company/person
  investmentType?: "fixed_deposit" | "share" | "bond" | "others";
  investmentAmount: number;
  investmentDate: Date;
  maturityDate?: Date;
  returnRate?: number; // profit/interest rate

  // Incoming Investment
  investorName?: string;
  investorContact?: string;
  incomingType?: "donation_fund" | "share" | "partnership" | "others";
  returnPolicy?: string;

  // Common
  status: "active" | "closed" | "withdrawn";
  returnHistory?: TReturnHistory[];
}
