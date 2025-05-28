import { ObjectId } from 'mongoose';

export type TClass = {
  className: string;
  teacher:ObjectId;
  student:ObjectId;
  createdAt: Date;
  sections: ObjectId[];
  updatedAt: Date;
};
