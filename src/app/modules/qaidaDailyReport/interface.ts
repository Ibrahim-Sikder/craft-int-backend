export interface IDayEntry {
  hadithNumber: string;
  duaNumber: string;
  tajweedSubject: string;
  qaidaPage: string;
  pageAmount: string;
  hadithDuaRevision: string;
  duaRevision: string;
  tajweedRevision: string;
  qaidaRevision: string;
  teacherSignature: string;
  comment: string;
}

export interface IQaidaDailyReport {
  studentName: string;
  reportDate: Date;
  month: string;
  weeklyTarget: string;
  dailyEntries: {
    saturday: IDayEntry;
    sunday: IDayEntry;
    monday: IDayEntry;
    tuesday: IDayEntry;
    wednesday: IDayEntry;
    thursday: IDayEntry;
    friday: IDayEntry;
  };
}