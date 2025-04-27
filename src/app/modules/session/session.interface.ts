import { Document } from 'mongoose';

export interface IAcademicSession extends Document {
  sessionName: string;
  isCurrent: boolean;
  startDate: Date;
  endDate: Date;
  workingDays: number;
  holidays: number;
  createdAt: Date;
  updatedAt: Date;
}
