export type TExpenseCategory = "utilities" | "salary" | "supplies" | "transport" | "maintenance"
export type TPaymentMethod = "cash" | "bank" | "check" | "mobile"
export type TExpenseStatus = "Paid" | "Pending" | "Overdue"

export interface IExpense {
  category: TExpenseCategory
  description: string
  amount: number
  date?: Date
  paymentMethod: TPaymentMethod
  status?: TExpenseStatus
}
