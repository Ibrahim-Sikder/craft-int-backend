

export interface ISalary {
  employee: string; 
  effectiveDate: string;
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
