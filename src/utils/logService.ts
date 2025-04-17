import { Request } from 'express';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import httpStatus from 'http-status';
import { AppError } from '../app/error/AppError';

const countLogEntries = async (filePath: string): Promise<number> => {
  let count = 0;
  try {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    for await (const line of rl) {
      if (line.startsWith('[')) {
        count++;
      }
    }
  } catch (error) {
    console.error(`Error counting log entries in file ${filePath}:`, error);
  }
  return count;
};

// Helper function to read log entries with pagination in reverse order
const readLogFile = async (
  filePath: string,
  startIndex: number,
  endIndex: number
): Promise<string[]> => {
  const logs: string[] = [];

  try {
    const fileStream = fs.createReadStream(filePath, { encoding: 'utf8' });
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    // Read the file line by line, collecting entries
    const entries: string[] = [];
    for await (const line of rl) {
      if (line.startsWith('[')) {
        entries.push(line);
      } else if (entries.length > 0) {
        entries[entries.length - 1] += `\n${line}`;
      }
    }

    // Reverse entries for latest data first
    entries.reverse();

    // Return the desired range of log entries
    logs.push(...entries.slice(startIndex, endIndex));
  } catch (error) {
    console.error(`Error reading log file ${filePath}:`, error);
  }

  return logs;
};

// Main function to get all logs with pagination
export const getAllLogs = async (
  page: number = 1,
  pageSize: number = 30
): Promise<{
  combined: string[];
  error: string[];
  exception: string[];
  rejection: string[];
  totalEntries: number;
}> => {
  const logFiles = {
    combined: path.resolve(
      process.cwd(),
      'logs',
      `combined-${new Date().toISOString().slice(0, 10)}.log`
    ),
    error: path.resolve(process.cwd(), 'logs', 'error.log'),
    exception: path.resolve(process.cwd(), 'logs', 'exception.log'),
    rejection: path.resolve(process.cwd(), 'logs', 'rejection.log')
  };

  const logCounts = await Promise.all([
    countLogEntries(logFiles.combined),
    countLogEntries(logFiles.error),
    countLogEntries(logFiles.exception),
    countLogEntries(logFiles.rejection)
  ]);

  const totalEntries = logCounts.reduce((sum, count) => sum + count, 0);

  const startIndex = Math.max(totalEntries - page * pageSize, 0);
  const endIndex = startIndex + pageSize;

  const logs = {
    combined: [] as string[],
    error: [] as string[],
    exception: [] as string[],
    rejection: [] as string[],
    totalEntries
  };

  // Fetch logs for the current page from each log file
  if (startIndex < logCounts[0]) {
    logs.combined = await readLogFile(
      logFiles.combined,
      Math.max(0, logCounts[0] - endIndex),
      logCounts[0] - startIndex
    );
  }
  if (endIndex > logCounts[0]) {
    const adjustedStartIndex = Math.max(0, startIndex - logCounts[0]);
    const adjustedEndIndex = Math.min(endIndex - logCounts[0], logCounts[1]);
    logs.error = await readLogFile(logFiles.error, adjustedStartIndex, adjustedEndIndex);
  }
  if (endIndex > logCounts[0] + logCounts[1]) {
    const adjustedStartIndex = Math.max(0, startIndex - logCounts[0] - logCounts[1]);
    const adjustedEndIndex = Math.min(endIndex - logCounts[0] - logCounts[1], logCounts[2]);
    logs.exception = await readLogFile(logFiles.exception, adjustedStartIndex, adjustedEndIndex);
  }
  if (endIndex > logCounts[0] + logCounts[1] + logCounts[2]) {
    const adjustedStartIndex = Math.max(0, startIndex - logCounts[0] - logCounts[1] - logCounts[2]);
    const adjustedEndIndex = Math.min(
      endIndex - logCounts[0] - logCounts[1] - logCounts[2],
      logCounts[3]
    );
    logs.rejection = await readLogFile(logFiles.rejection, adjustedStartIndex, adjustedEndIndex);
  }

  return logs;
};

export const getAllLogsService = async (req: Request) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 30;

    const logsData = await getAllLogs(page, pageSize);
    const totalPages = Math.ceil(logsData.totalEntries / pageSize);

    return {
      status: 'success',
      data: {
        combined: logsData.combined,
        error: logsData.error,
        exception: logsData.exception,
        rejection: logsData.rejection
      },
      meta: {
        page,
        pageSize,
        totalPages,
        totalEntries: logsData.totalEntries
      }
    };
  } catch (err) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to read log files');
  }
};
