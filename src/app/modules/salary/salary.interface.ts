
import { Types } from "mongoose";

export interface ISalary {
  employeeId: Types.ObjectId; 
  effectiveDate: Date;
  basicSalary: number;
  houseRent: number;
  medicalAllowance: number;
  transportAllowance: number;
  foodAllowance: number;
  otherAllowances: number;
  incomeTax: number;
  providentFund: number;
  otherDeductions: number;
  notes?: string;
  grossSalary: number;
  netSalary: number;
}
