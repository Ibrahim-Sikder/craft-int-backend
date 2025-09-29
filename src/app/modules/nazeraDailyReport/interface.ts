// nazeraReport.interface.ts
export interface IDailySession {
  para: string
  page: string
  amount: string
  mistakes: string
}


export interface IDayEntry {
  morning: IDailySession
  afternoon: IDailySession
  night: IDailySession
  totalRead: string
  duaHadithMasala: string
  mashq?: string
  tajweed?: string
}

export interface INazeraReport {
  teacherName: string
  studentName: string
  reportDate: string
  month: string
  dailyEntries: {
    saturday: IDayEntry
    sunday: IDayEntry
    monday: IDayEntry
    tuesday: IDayEntry
    wednesday: IDayEntry
    thursday: IDayEntry
    friday: IDayEntry
  }
  // Weekly totals
  totalPages?: number
  totalMistakes?: number
  totalDuas?: number
  totalHadiths?: number
}