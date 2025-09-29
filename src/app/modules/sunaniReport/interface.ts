import { Document } from 'mongoose';

export interface ISunaniReport {
  teacherName: string;
  studentName: string;
  reportDate: string;
  month: string;
  weeklyTarget: string;
  dailyEntries: {
    saturday: {
      sobok: { para: string; page: string };
      sabakSeven: { para: string; page: string };
      sabakAmukta: { para: string; page: string };
      satSobok: { para: string; page: string; amount: string; wrong: string };
      tilawaAmount: string;
      mashq: string;
      tajweed: string;
      teacherSignature: string;
      thursdayWeeklyRevision: string;
    };
    sunday: {
      sobok: { para: string; page: string };
      sabakSeven: { para: string; page: string };
      sabakAmukta: { para: string; page: string };
      satSobok: { para: string; page: string; amount: string; wrong: string };
      tilawaAmount: string;
      mashq: string;
      tajweed: string;
      teacherSignature: string;
      thursdayWeeklyRevision: string;
    };
    monday: {
      sobok: { para: string; page: string };
      sabakSeven: { para: string; page: string };
      sabakAmukta: { para: string; page: string };
      satSobok: { para: string; page: string; amount: string; wrong: string };
      tilawaAmount: string;
      mashq: string;
      tajweed: string;
      teacherSignature: string;
      thursdayWeeklyRevision: string;
    };
    tuesday: {
      sobok: { para: string; page: string };
      sabakSeven: { para: string; page: string };
      sabakAmukta: { para: string; page: string };
      satSobok: { para: string; page: string; amount: string; wrong: string };
      tilawaAmount: string;
      mashq: string;
      tajweed: string;
      teacherSignature: string;
      thursdayWeeklyRevision: string;
    };
    wednesday: {
      sobok: { para: string; page: string };
      sabakSeven: { para: string; page: string };
      sabakAmukta: { para: string; page: string };
      satSobok: { para: string; page: string; amount: string; wrong: string };
      tilawaAmount: string;
      mashq: string;
      tajweed: string;
      teacherSignature: string;
      thursdayWeeklyRevision: string;
    };
    thursday: {
      sobok: { para: string; page: string };
      sabakSeven: { para: string; page: string };
      sabakAmukta: { para: string; page: string };
      satSobok: { para: string; page: string; amount: string; wrong: string };
      tilawaAmount: string;
      mashq: string;
      tajweed: string;
      teacherSignature: string;
      thursdayWeeklyRevision: string;
    };
    friday: {
      sobok: { para: string; page: string };
      sabakSeven: { para: string; page: string };
      sabakAmukta: { para: string; page: string };
      satSobok: { para: string; page: string; amount: string; wrong: string };
      tilawaAmount: string;
      mashq: string;
      tajweed: string;
      teacherSignature: string;
      thursdayWeeklyRevision: string;
    };
  };
  weeklySummary?: {
    totalSobok: number;
    totalSatSobok: number;
    totalSabakAmukta: number;
    totalTilawat: number;
    totalRevision: number;
  };
  createdBy?: string;
}

export interface ISunaniReportModel extends ISunaniReport, Document {}