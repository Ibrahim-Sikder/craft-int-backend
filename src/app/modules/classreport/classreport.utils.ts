/* eslint-disable @typescript-eslint/no-explicit-any */
import Redis from "ioredis"

// Initialize Redis client
const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: 3,
})

export const clearClassReportsCache = async () => {
  try {
    const keys = await redis.keys("class_reports:*")
    if (keys.length > 0) {
      await redis.del(...keys)
      console.log(`Cleared ${keys.length} class reports cache entries`)
    }
  } catch (error) {
    console.error("Error clearing class reports cache:", error)
  }
}

// Helper function to clear specific cache patterns
export const clearClassReportsCachePattern = async (pattern: any) => {
  try {
    const keys = await redis.keys(`class_reports:*${pattern}*`)
    if (keys.length > 0) {
      await redis.del(...keys)
      console.log(`Cleared ${keys.length} class reports cache entries matching pattern: ${pattern}`)
    }
  } catch (error) {
    console.error("Error clearing class reports cache pattern:", error)
  }
}
