// src/modules/expense/expense.cache.ts
import Redis from "ioredis"

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: 3,
})

export const clearExpenseCache = async () => {
  try {
    const keys = await redis.keys("expenses:*")
    if (keys.length > 0) {
      await redis.del(...keys)
      console.log(`🧹 Cleared ${keys.length} expense cache entries`)
    }
  } catch (err) {
    console.error("❌ Failed to clear expense cache:", err)
  }
}

export const clearExpenseCachePattern = async (pattern: string) => {
  try {
    const keys = await redis.keys(`expenses:*${pattern}*`)
    if (keys.length > 0) {
      await redis.del(...keys)
      console.log(`🧹 Cleared ${keys.length} expense cache entries matching: ${pattern}`)
    }
  } catch (err) {
    console.error("❌ Failed to clear expense cache with pattern:", err)
  }
}
