import { Types } from 'mongoose';

export interface TSubjectAssign {
  _id?: Types.ObjectId;
  subjectName: string;
  subjectCode: string;
  description?: string;
  classId: Types.ObjectId;
  teacherId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
