import { Types } from 'mongoose';

export interface IStudentEvaluation {
  studentId: Types.ObjectId;
  lessonEvaluation: 'পড়া শিখেছে' | 'আংশিক শিখেছে' | 'পড়া শিখেনি';
  handwriting: 'লিখেছে' | 'আংশিক লিখেছে' | 'লিখেনি';
  attendance: 'উপস্থিত' | 'অনুপস্থিত' | 'ছুটি';
  parentSignature: boolean;
  comments?: string;
}

export interface IClassReport {
  teacherId: Types.ObjectId;
  classId: Types.ObjectId;
  subjectId: Types.ObjectId;
  hour: string;
  date: Date;
  studentEvaluations: IStudentEvaluation[];
  todayLesson?: Types.ObjectId;
  homeTask?: Types.ObjectId;
}
