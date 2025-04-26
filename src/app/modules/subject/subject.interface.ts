import { ObjectId } from 'mongoose';

export type TSubject = {
  name: string;
  code: string;
  image?: string;
  paper?: string;
  lessons?: {
    lessonNo: number;
    lessonName: string;
  }[];
  classes: ObjectId[];
  teachers: ObjectId[];
  isOptional?: boolean;
};
