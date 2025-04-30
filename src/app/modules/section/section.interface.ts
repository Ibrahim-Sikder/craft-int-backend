import { Document, Types } from 'mongoose';

export interface ISection extends Document {
  name: string;
  capacity: number;
  classes: Types.ObjectId;
  teachers?: Types.ObjectId;
  rooms?: Types.ObjectId;
  timeSlots: Types.ObjectId[];
  sectionType: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

}
