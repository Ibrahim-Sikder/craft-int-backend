import { Schema, model } from 'mongoose';

const SubjectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Subject name is required'],
      trim: true,
    },
    code: {
      type: String,
      required: [true, 'Subject code is required'],
      unique: true,
      trim: true,
    },
    image: {
      type: String,
      default: '',
    },
    paper: {
      type: String,
      default: '',
    },
    lessons: [
      {
        lessonNo: {
          type: Number,
          required: true,
        },
        lessonName: {
          type: String,
          required: true,
        },
      },
    ],
    classId: {
      type: Schema.Types.ObjectId,
      ref: 'Class',
      required: [true, 'Class ID is required'],
    },
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher',
    },
    isOptional: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Subject = model('Subject', SubjectSchema);
