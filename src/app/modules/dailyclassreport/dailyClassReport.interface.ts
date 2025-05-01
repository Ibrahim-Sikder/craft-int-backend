export interface IReportRow {
    subject: string;
    class: string;
    fullyLearned: number;
    partiallyLearned: number;
    notLearned: number;
    lessonDetails: string;
    homework: string;
    diaryCompleted: 'হ্যাঁ' | 'না';
    learningPercentage:number;
    totalStudents:number;
  }
  
  export interface TDailyClassReport {
    teacherName: string;
    date: string;
    classes: IReportRow[];
  }
  