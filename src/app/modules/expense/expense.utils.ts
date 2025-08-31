import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: 3,
});

export const clearExpenseCache = async () => {
  try {
    const keys = await redis.keys("expenses:*");
    const singleKeys = await redis.keys("expense:*");
    const allKeys = [...keys, ...singleKeys];
    if (allKeys.length > 0) {
      await redis.del(...allKeys);
      console.log(`🧹 Cleared ${allKeys.length} expense cache entries`);
    }
  } catch (error) {
    console.error("❌ Error clearing expense cache:", error);
  }
};
