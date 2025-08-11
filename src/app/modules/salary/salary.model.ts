// src/models/salary.model.ts

import { Schema, model } from "mongoose";
import { ISalary } from "./salary.interface";

const SalarySchema = new Schema<ISalary>(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: [true, "Employee ID is required"],
    },
    effectiveDate: {
      type: Date,
      required: [true, "Effective date is required"],
    },
    basicSalary: {
      type: Number,
      required: [true, "Basic salary is required"],
      min: [0, "Basic salary cannot be negative"],
    },
    houseRent: { type: Number, default: 0, min: 0 },
    medicalAllowance: { type: Number, default: 0, min: 0 },
    transportAllowance: { type: Number, default: 0, min: 0 },
    foodAllowance: { type: Number, default: 0, min: 0 },
    otherAllowances: { type: Number, default: 0, min: 0 },
    incomeTax: { type: Number, default: 0, min: 0 },
    providentFund: { type: Number, default: 0, min: 0 },
    otherDeductions: { type: Number, default: 0, min: 0 },
    notes: { type: String, trim: true },

    grossSalary: { type: Number, required: true },
    netSalary: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to calculate gross & net salary
SalarySchema.pre("save", function (next) {
  const allowances =
    (this.houseRent || 0) +
    (this.medicalAllowance || 0) +
    (this.transportAllowance || 0) +
    (this.foodAllowance || 0) +
    (this.otherAllowances || 0);

  const deductions =
    (this.incomeTax || 0) +
    (this.providentFund || 0) +
    (this.otherDeductions || 0);

  this.grossSalary = (this.basicSalary || 0) + allowances;
  this.netSalary = this.grossSalary - deductions;

  next();
});

export const Salary = model<ISalary>("Salary", SalarySchema);
