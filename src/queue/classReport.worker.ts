import { Worker } from 'bullmq';
import { ClassReport } from '../app/modules/classreport/classreport.model';
import { redisConnection } from './queue';

export const classReportWorker = new Worker(
  'classReportQueue',
  async job => {
    const data = job.data;
    await ClassReport.create(data);
  },
  redisConnection
);

classReportWorker.on('completed', job => {
  console.log(`✅ Job ${job.id} completed`);
});

classReportWorker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} failed: ${err.message}`);
});
