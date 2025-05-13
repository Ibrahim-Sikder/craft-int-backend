import { ObjectId } from "mongoose";

export type TClass = {
  className: string;
  createdAt: Date;
    sections: ObjectId[];
  updatedAt: Date;
};
