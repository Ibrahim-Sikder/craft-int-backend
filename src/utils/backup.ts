import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import cron from 'node-cron';

const DB_NAME = 'sarabelanews';
const ARCHIVE_PATH = path.join(__dirname, 'public', `${DB_NAME}.gzip`);

// Ensure the public directory exists
const PUBLIC_DIR = path.join(__dirname, 'public');
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR);
}

// Run backup immediately when the script starts
backupMongo();

// Schedule the backup every 5 seconds
cron.schedule('*/5 * * * * *', () => backupMongo());

function backupMongo(): void {


  const child = spawn('mongodump', [
    `--db=${DB_NAME}`,
    `--archive=${ARCHIVE_PATH}`,
    '--gzip',
  ]);

  child.stdout.on('data', (data: Buffer) => {
    console.log('stdout:\n', data.toString());
  });

  child.stderr.on('data', (data: Buffer) => {
    console.log('stderr:\n', data.toString());
  });

  child.on('error', (error: Error) => {
    console.error('Error:\n', error);
  });

  child.on('exit', (code: number | null, signal: string | null) => {
    if (code !== null) console.log('Process exited with code:', code);
    else if (signal !== null) console.log('Process killed with signal:', signal);
    else console.log('Backup is successful ✅');
  });
}


export default backupMongo