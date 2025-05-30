// utils/redisClient.ts
import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
redisClient.on('error', (err:any) => console.error('Redis Client Error', err));

(async () => {
  if (!redisClient.isOpen) await redisClient.connect();
})();

export default redisClient;
