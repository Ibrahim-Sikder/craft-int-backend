// report.types.ts

export type ReportType = "nazera" | "ampara" | "hifz" | "qaida";

export interface ReportRowData {
  label: string;
  values: string[];
}

export interface WeeklyReportData {
  studentName: string;
  date: string;
  month: string;
  reportType: ReportType;
  rows: ReportRowData[];
}
