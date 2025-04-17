/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import config from './app/config';
import cron from 'node-cron';
import path from 'path';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import fs from 'fs';
import { getAllLogsService } from './utils/logService';
import { backupMongoDB, restoreMongoDB } from './utils/backupService';
const app: Application = express();
app.use(helmet());

// Define ARCHIVE_PATH
const rootDir = process.cwd();
const ARCHIVE_PATH = path.join(rootDir, 'public', 'sarabelanews.gzip');

// Logging middleware in development environment
if (config.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting middleware
app.use(
  rateLimit({
    max: 2000,
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Too many requests sent by this IP, please try again in an hour!',
  }),
);
// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const allowedOrigins = [
  config.CROSS_ORIGIN_CLIENT,
  config.CROSS_ORIGIN_ADMIN,
  config.LOCALHOST_CLIENT,
  config.LOCALHOST_ADMIN,
];


app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'success',
    message: 'API is healthy',
  });
});

// Root Endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'success',
    message: 'Welcome to the API',
    data: {
      name: 'API',
      version: '1.0.0',
    },
  });
});

app.get('/api/v1/logs', async (req: Request, res: Response) => {
  try {
    const result = await getAllLogsService(req);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read log files' });
  }
});

app.post('/api/v1/backup', async (req: Request, res: Response) => {
  try {
    await backupMongoDB();
    res.json({ status: 'success', message: 'Backup completed successfully' });
  } catch (error: any) {
    res
      .status(500)
      .json({
        status: 'error',
        message: 'Backup failed',
        error: error.message,
      });
  }
});

cron.schedule('0 0 * * *', async () => {
  console.log('Running automatic database backup...');
  try {
    await backupMongoDB();
    console.log('Automatic backup completed successfully ✅');
  } catch (error: any) {
    console.error('Automatic backup failed ❌', error.message);
  }
});

app.post('/api/v1/restore', async (req: Request, res: Response) => {
  try {
    await restoreMongoDB();
    res.json({ status: 'success', message: 'Restore completed successfully' });
  } catch (error: any) {
    res
      .status(500)
      .json({
        status: 'error',
        message: 'Restore failed',
        error: error.message,
      });
  }
});
app.get('/api/v1/download-backup', (req: Request, res: Response) => {
  res.download(ARCHIVE_PATH, 'sarabelanews.gzip');
});
app.get('/api/v1/backup-logs', (req: Request, res: Response) => {
  const logPath = path.join(process.cwd(), 'public', 'backup_logs.json');

  if (fs.existsSync(logPath)) {
    const logs = JSON.parse(fs.readFileSync(logPath, 'utf8'));

    // Sort logs by backupEndTime in descending order
    logs.sort(
      (a: any, b: any) =>
        new Date(b.backupEndTime).getTime() -
        new Date(a.backupEndTime).getTime(),
    );

    res.json(logs);
  } else {
    res.status(404).json({ message: 'No logs found' });
  }
});

// Application Routes
app.use('/api/v1', router);

// Error Handlers
app.use(globalErrorHandler);
app.use(notFound);

export default app;
