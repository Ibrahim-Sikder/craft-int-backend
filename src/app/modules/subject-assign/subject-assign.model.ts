import { model, Schema } from "mongoose";
import { TSubjectAssign } from "./subject-assign.interface";

const subjectSchema = new Schema<TSubjectAssign>(
  {
    subjectName: {
      type: String,
      required: true,
      trim: true,
    },
    subjectCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    description: {
      type: String,
    },
    classId: {
      type: Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export const SubjectAssign = model<TSubjectAssign>('Subject', subjectSchema);
