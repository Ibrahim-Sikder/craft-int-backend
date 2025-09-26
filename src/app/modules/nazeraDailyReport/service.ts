/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { INazeraReport } from './interface';
import { NazeraReportModel } from './model';
import QueryBuilder from '../../builder/QueryBuilder';

// Utility function: Weekly summary calculation
const calculateWeeklySummary = (dailyEntries: INazeraReport['dailyEntries']) => {
  let totalPages = 0;
  let totalMistakes = 0;

  Object.values(dailyEntries).forEach((day) => {
    ['morning', 'afternoon', 'night'].forEach((session) => {
      const sessionData = day[session as keyof typeof day];
      if (sessionData && typeof sessionData === 'object' && 'page' in sessionData) {
        totalPages += Number((sessionData as any).page) || 0;
      }
      if (sessionData && typeof sessionData === 'object' && 'mistakes' in sessionData) {
        totalMistakes += Number((sessionData as any).mistakes) || 0;
      }
    });
  });

  return {
    totalPages,
    totalMistakes,
  };
};

const createNazeraDailyReport = async (payload: INazeraReport, userId?: string) => {
  const weeklySummary = calculateWeeklySummary(payload.dailyEntries);

  const reportData = {
    ...payload,
    weeklySummary,
    ...(userId && { createdBy: userId }),
  };

  const result = await NazeraReportModel.create(reportData);
  return result;
};

const getAllNazeraDailyReports = async (query: Record<string, unknown>) => {
  const nazeraReportQuery = new QueryBuilder(
    NazeraReportModel.find(),
    query,
  )
    .search(['teacherName', 'studentName', 'month'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await nazeraReportQuery.countTotal();
  const data = await nazeraReportQuery.modelQuery;

  return { meta, data };
};

const getSingleNazeraDailyReport = async (id: string) => {
  const result = await NazeraReportModel.findById(id)

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Nazera Daily Report not found');
  }
  return result;
};

const updateNazeraDailyReport = async (
  id: string,
  payload: Partial<INazeraReport> & { weeklySummary?: { totalPages: number; totalMistakes: number } },
  userId?: string
) => {
  const existingReport = await NazeraReportModel.findById(id);
  if (!existingReport) {
    throw new AppError(httpStatus.NOT_FOUND, 'Nazera Daily Report not found');
  }

  let updateData = { ...payload };
  if (payload.dailyEntries) {
    const weeklySummary = calculateWeeklySummary(payload.dailyEntries);
    updateData = { ...updateData, weeklySummary };
  }

  const result = await NazeraReportModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update Nazera Daily Report');
  }

  return result;
};

const deleteNazeraDailyReport = async (id: string) => {
  const result = await NazeraReportModel.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Nazera Daily Report not found or already deleted');
  }

  return result;
};

const getReportsByStudent = async (studentName: string, query: Record<string, unknown>) => {
  const nazeraReportQuery = new QueryBuilder(
    NazeraReportModel.find({ studentName }).populate('createdBy', 'name email'),
    query,
  )
    .filter()
    .sort()
    .paginate();

  const meta = await nazeraReportQuery.countTotal();
  const data = await nazeraReportQuery.modelQuery;

  return { meta, data };
};

export const nazeraDailyReportServices = {
  createNazeraDailyReport,
  getAllNazeraDailyReports,
  getSingleNazeraDailyReport,
  updateNazeraDailyReport,
  deleteNazeraDailyReport,
  getReportsByStudent,
};
