export interface IIncome {
  source: "tuition" | "grant" | "donation" | "admission" | "event"
  description: string
  amount: number
  date: Date
  createdAt?: Date
  updatedAt?: Date
}
