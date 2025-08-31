// hifzReport.interface.ts

export interface IStudentInfo {
  studentName: string
  studentId: string
  class: string
  date: string   // "YYYY-MM-DD"
  day: string
}

export interface IReportRow {
  id: string
  section?: string
  title: string            // <<— স্ট্যাটিক লেবেল (e.g., "দোয়া সংখ্যা")
  lesson: string           // <<— পড়ার পরিমাণ (ইউজার ইনপুট)
  dailyFoundation?: string
  weeklyFoundation?: string
  teacherSignature?: string
}

export interface IHifzClassReport {
  studentInfo: IStudentInfo
  reportRows: IReportRow[]
  createdAt?: string
}
