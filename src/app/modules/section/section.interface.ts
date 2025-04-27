import { Document, Types } from 'mongoose';

export interface ISection extends Document {
  name: string;
  capacity: number;
  classId: Types.ObjectId;
  teacherId?: Types.ObjectId;
  roomId?: Types.ObjectId;
  timeSlots: Types.ObjectId[];
  sectionType: string;
  color: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

}
