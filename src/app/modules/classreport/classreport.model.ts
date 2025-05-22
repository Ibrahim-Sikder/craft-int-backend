import { Schema, model } from 'mongoose';
import { IClassReport, IStudentEvaluation } from './classreport.interface';

const studentEvaluationSchema = new Schema<IStudentEvaluation>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'Student',

    },


    lessonEvaluation: {
      type: String,
      enum: ["পড়া শিখেছে", "আংশিক শিখেছে", "পড়া শিখেনি", "অনুপস্থিত", "পাঠ নেই",],
    
    },
    handwriting: {
      type: String,
      enum: ["লিখেছে", "আংশিক লিখেছে", "লিখেনি", "কাজ নেই", 'অনুপস্থিত'],
 
    },
    attendance: {
      type: String,
      enum: ['উপস্থিত', 'অনুপস্থিত', 'ছুটি',],

    },
 
    parentSignature: {
      type: Boolean,
  
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
    noTaskForClass: {
       type: Boolean,
    },
    lessonEvaluationTask: {
       type: Boolean,
    },
    handwrittenTask: {
       type: Boolean,
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
