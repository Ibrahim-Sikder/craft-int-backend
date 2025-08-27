// transaction.interface.ts
import { Document } from "mongoose";

export interface TTransaction extends Document {
  account_type: "asset" | "liability" | "equity" | "income" | "expense";
  category: string;       
  description?: string;
  amount: number;
  date: Date;
  reference?: {
    model: string;  
    id: string;  
  };
}
