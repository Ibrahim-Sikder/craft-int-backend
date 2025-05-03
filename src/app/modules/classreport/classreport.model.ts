import { Schema, model } from 'mongoose';
import { IClassReport, IStudentEvaluation } from './classreport.interface';

const studentEvaluationSchema = new Schema<IStudentEvaluation>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    lessonEvaluation: {
      type: String,
      enum: ['পড়া শিখেছে', 'আংশিক শিখেছে', 'পড়া শিখেনি'],
      required: true,
    },
    handwriting: {
      type: String,
      enum: ['লিখেছে', 'আংশিক লিখেছে', 'লিখেনি'],
      required: true,
    },
    attendance: {
      type: String,
      enum: ['উপস্থিত', 'অনুপস্থিত', 'ছুটি'],
      required: true,
    },
    parentSignature: {
      type: Boolean,
      required: true,
    },
    comments: {
      type: String,
    },
  },
  { _id: false },
);

const classReportSchema = new Schema<IClassReport>(
  {
    teachers: {
      type: String,
      required: true,
    },
    classes: {
      type: String,
      required: true,
    },
    subjects: {
     type:String,
      required: true,
    },
    hour: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    studentEvaluations: {
      type: [studentEvaluationSchema],
      required: true,
    },
    todayLesson: {
      type: Schema.Types.ObjectId,
      ref: 'TodayLesson',
    },
    homeTask: {
      type: Schema.Types.ObjectId,
      ref: 'TodayTask',
    },
  },
  {
    timestamps: true,
  },
);


export const ClassReport = model<IClassReport>(
  'ClassReport',
  classReportSchema,
);
