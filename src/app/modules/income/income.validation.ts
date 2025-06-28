import { z } from "zod"

export const createIncomeValidation = z.object({
  body:z.object({
    source: z.enum(["tuition", "grant", "donation", "admission", "event"]),
  description: z.string().min(3, "Description is required"),
  amount: z.number().min(0, "Amount must be positive"),
  date: z.string().refine(
    (val) => !isNaN(Date.parse(val)),
    { message: "Invalid date format" }
  ),
  })
})

