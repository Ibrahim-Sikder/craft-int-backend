import httpStatus from 'http-status'
import { AppError } from '../../error/AppError'
import QueryBuilder from '../../builder/QueryBuilder'
import { Expense } from './expense.model'
import { IExpense } from './expense.interface'
import Redis from 'ioredis'
import { clearExpenseCache } from './expense.utils'

// Initialize Redis client
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: 3,
})

const createExpense = async (payload: IExpense) => {
  const result = await Expense.create(payload)

  // Clear expense cache after create
  await clearExpenseCache()

  return result
}

const getAllExpenses = async (query: Record<string, unknown>) => {
  const cacheKey = `expenses:${JSON.stringify(query)}`
  try {
    const cached = await redis.get(cacheKey)
    if (cached) {
      console.log('✅ Returning cached expenses data')
      return JSON.parse(cached)
    }
  } catch (err) {
    console.error('Redis read error:', err)
  }

  const expenseQuery = new QueryBuilder(Expense.find(), query)
    .search(['name', 'description', 'category'])
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await expenseQuery.countTotal()
  const data = await expenseQuery.modelQuery

  const result = { meta, data }

  try {
    await redis.setex(cacheKey, 300, JSON.stringify(result)) // Cache for 5 minutes
    console.log('✅ Cached expenses data')
  } catch (err) {
    console.error('Redis write error:', err)
  }

  return result
}

const getSingleExpense = async (id: string) => {
  const cacheKey = `expense:${id}`
  try {
    const cached = await redis.get(cacheKey)
    if (cached) {
      console.log('✅ Returning cached single expense')
      return JSON.parse(cached)
    }
  } catch (err) {
    console.error('Redis read error:', err)
  }

  const result = await Expense.findById(id)

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Expense not found')
  }

  try {
    await redis.setex(cacheKey, 300, JSON.stringify(result))
  } catch (err) {
    console.error('Redis write error:', err)
  }

  return result
}

const updateExpense = async (id: string, payload: Partial<IExpense>) => {
  const result = await Expense.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update expense')
  }

  // Clear relevant caches after update
  await redis.del(`expense:${id}`)
  await clearExpenseCache()

  return result
}

const deleteExpense = async (id: string) => {
  const result = await Expense.findByIdAndDelete(id)

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Expense not found or already deleted')
  }

  // Clear relevant caches after delete
  await redis.del(`expense:${id}`)
  await clearExpenseCache()

  return result
}

export const expenseServices = {
  createExpense,
  getAllExpenses,
  getSingleExpense,
  updateExpense,
  deleteExpense,
}
