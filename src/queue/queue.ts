
import { Queue } from 'bullmq';

export const redisConnection = {
  connection: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
  },
};

export const classReportQueue = new Queue('classReportQueue', redisConnection);
