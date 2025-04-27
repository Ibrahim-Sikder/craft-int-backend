import { ObjectId } from 'mongoose';

export type TClass = {
  className: string;
  description: string;
  students: ObjectId[];
  teachers: ObjectId[];
  sections: ObjectId[];
  subjects: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
};
