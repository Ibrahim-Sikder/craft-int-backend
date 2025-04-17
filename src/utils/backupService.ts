/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/backupService.js
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import config from '../app/config';



const DB_NAME = config.DB_NAME as string || 'sarabelanews';
const rootDir = process.cwd();
const ARCHIVE_PATH = path.join(rootDir, 'public', 'sarabelanews.gzip');

const LOG_PATH = path.join(rootDir, 'public', 'backup_logs.json');

export function backupMongoDB(): Promise<void> {
  return new Promise((resolve, reject) => {
    const backupStartTime = new Date().toISOString();
    const command = `mongodump --db=${DB_NAME} --archive=${ARCHIVE_PATH} --gzip`;


    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Backup error:', error);
        logBackupMetadata({ status: 'failed', error: error.message, backupStartTime });
        reject(error);
        return;
      }

      if (stderr) {
        console.error('stderr:\n', stderr);
      }


      logBackupMetadata({ status: 'successful', backupStartTime });
      resolve();
    });
  });
}

export function restoreMongoDB(): Promise<void> {
  return new Promise((resolve, reject) => {
    const command = `mongorestore --db=${DB_NAME} --archive=${ARCHIVE_PATH} --gzip`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Restore error:', error);
        reject(error);
        return;
      }

      if (stderr) {
        console.error('stderr:\n', stderr);
      }
      resolve();
    });
  });
}

function logBackupMetadata({
  status,
  error = null,
  code = null,
  signal = null,
  backupStartTime
}: {
  status: string;
  error?: string | null;
  code?: number | null;
  signal?: string | null;
  backupStartTime: string;
}) {
  const backupEndTime = new Date().toISOString();
  const logEntry = {
    status,
    error,
    code,
    signal,
    backupStartTime,
    backupEndTime,
    archivePath: ARCHIVE_PATH
  };

  // Calculate expiration date (7 days ago)
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() - 7);

  // Read existing logs
  const logs = fs.existsSync(LOG_PATH) ? JSON.parse(fs.readFileSync(LOG_PATH, 'utf8')) : [];

  // Filter out logs older than 7 days
  const prunedLogs = logs.filter((log: any) => new Date(log.backupEndTime) >= expirationDate);

  // Append the new log entry
  prunedLogs.push(logEntry);

  // Write the updated and pruned logs back to file
  fs.writeFileSync(LOG_PATH, JSON.stringify(prunedLogs, null, 2));
}
