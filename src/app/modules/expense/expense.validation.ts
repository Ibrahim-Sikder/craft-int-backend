import { z } from "zod"

export const createExpenseValidationSchema = z.object({
  body:z.object({
    category: z.enum(["utilities", "salary", "supplies", "transport", "maintenance"]),
  description: z.string().min(3, "Description is required"),
  amount: z.number({ required_error: "Amount is required" }).positive("Amount must be positive"),
  date: z.string().optional(), 
  paymentMethod: z.enum(["cash", "bank", "check", "mobile"]),
  status: z.enum(["Paid", "Pending", "Overdue"]).optional(),
  })
})


export const ExpenseValidations = {
    createExpenseValidationSchema
}