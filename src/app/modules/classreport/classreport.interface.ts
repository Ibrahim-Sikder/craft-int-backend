import { Types } from 'mongoose';

export interface IStudentEvaluation {
  studentId: Types.ObjectId;
  lessonEvaluation: | 'পড়া শিখেছে'
    | 'আংশিক শিখেছে'
    | 'পড়া শিখেনি'
    | 'অনুপস্থিত' | 'পাঠ নেই';
  handwriting: 'লিখেছে' | 'আংশিক লিখেছে' | 'লিখেনি' | 'কাজ নেই' | 'অনুপস্থিত';
  attendance: 'উপস্থিত' | 'অনুপস্থিত' | 'ছুটি' | 'অনুপস্থিত',
  parentSignature: boolean;
  comments?: string;
}

export interface IClassReport {
  teachers: string;
  classes: string;
  subjects: string;
  hour: string;
  date: Date;
  studentEvaluations: IStudentEvaluation[];
  todayLesson?: Types.ObjectId[];
  homeTask?: Types.ObjectId[];
  noTaskForClass:boolean;
  handwrittenTask:boolean;
  lessonEvaluationTask:boolean;
}
