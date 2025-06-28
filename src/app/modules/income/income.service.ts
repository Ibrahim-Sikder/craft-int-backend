import httpStatus from "http-status"
import { AppError } from "../../error/AppError"
import { Income } from "./income.model"
import { IIncome } from "./income.interface"
import Redis from "ioredis"
import { clearIncomeCache } from "./income.utils"

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: 3,
})


const createIncome = async (payload: IIncome) => {
  const result = await Income.create(payload)
  await clearIncomeCache()
  return result
}

const getAllIncomes = async (query: Record<string, unknown>) => {
  const cacheKey = `incomes:${JSON.stringify(query)}`
  try {
    const cached = await redis.get(cacheKey)
    if (cached) {
      console.log("✅ Returning cached incomes data")
      return JSON.parse(cached)
    }
  } catch (err) {
    console.error("Redis read error:", err)
  }

  // Simple query builder or pagination can be added as needed
  const incomes = await Income.find()
    .sort({ date: -1 }) // latest first
    .lean()

  try {
    await redis.setex(cacheKey, 300, JSON.stringify(incomes))
    console.log("✅ Cached incomes data")
  } catch (err) {
    console.error("Redis write error:", err)
  }

  return incomes
}

const getSingleIncome = async (id: string) => {
  const cacheKey = `income:${id}`
  try {
    const cached = await redis.get(cacheKey)
    if (cached) {
      console.log("✅ Returning cached single income")
      return JSON.parse(cached)
    }
  } catch (err) {
    console.error("Redis read error:", err)
  }

  const income = await Income.findById(id)
  if (!income) {
    throw new AppError(httpStatus.NOT_FOUND, "Income not found")
  }

  try {
    await redis.setex(cacheKey, 300, JSON.stringify(income))
  } catch (err) {
    console.error("Redis write error:", err)
  }

  return income
}

const updateIncome = async (id: string, payload: Partial<IIncome>) => {
  const income = await Income.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  if (!income) {
    throw new AppError(httpStatus.NOT_FOUND, "Failed to update income")
  }
  await redis.del(`income:${id}`)
  await clearIncomeCache()
  return income
}

const deleteIncome = async (id: string) => {
  const income = await Income.findByIdAndDelete(id)
  if (!income) {
    throw new AppError(httpStatus.NOT_FOUND, "Income not found or already deleted")
  }
  await redis.del(`income:${id}`)
  await clearIncomeCache()
  return income
}

export const incomeServices = {
  createIncome,
  getAllIncomes,
  getSingleIncome,
  updateIncome,
  deleteIncome,
}
