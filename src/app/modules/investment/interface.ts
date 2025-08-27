// investment.interface.ts
import { Document } from "mongoose";

export interface TInvestment extends Document {
  investment_type: "short_term" | "long_term";
  investment_name: string;
  amount: number;
  date: Date;
  expected_return?: number;
  maturity_date?: Date;
  status: "active" | "closed";
}
