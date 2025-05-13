import { Types } from "mongoose";

export type TClass = {
  className: string;
  createdAt: Date;
  sections:Types.ObjectId;
  updatedAt: Date;
};
