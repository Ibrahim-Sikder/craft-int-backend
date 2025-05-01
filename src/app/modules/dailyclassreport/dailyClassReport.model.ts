import { Schema, model } from 'mongoose';
import { IReportRow, TDailyClassReport } from './dailyClassReport.interface';

const reportRowSchema = new Schema<IReportRow>(
  {
    subject: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    fullyLearned: {
      type: Number,
      required: true,
    },
    partiallyLearned: {
      type: Number,
      required: true,
    },
    notLearned: {
      type: Number,
      required: true,
    },
    learningPercentage: {
      type: Number,
      required: true,
    },
    totalStudents: {
      type: Number,
      required: true,
    },
    lessonDetails: {
      type: String,
      required: true,
    },
    homework: {
      type: String,
      required: true,
    },
    diaryCompleted: {
      type: String,
      enum: ['হ্যাঁ', 'না'],
      required: true,
    },
  },
  {
    _id: false,
  }
);

const dailyClassReportSchema = new Schema<TDailyClassReport>(
  {
    teacherName: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    classes: {
      type: [reportRowSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const DailyClassReport = model<TDailyClassReport>('DailyClassReport', dailyClassReportSchema);
