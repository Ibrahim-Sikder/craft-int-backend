/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { ISobokiDailyReport } from './interface';
import { SobokiDailyReportModel } from './model';
import QueryBuilder from '../../builder/QueryBuilder';

// Calculate weekly summary from daily entries
const calculateWeeklySummary = (dailyEntries: ISobokiDailyReport['dailyEntries']) => {
  let totalSobok = 0;
  let totalSatSobok = 0;
  let totalSabakAmukta = 0;
  let totalTilawat = 0;
  let totalRevision = 0;

  Object.values(dailyEntries).forEach((day) => {
    // Calculate Sobok total
    if (day.sobok?.page) {
      totalSobok += parseInt(day.sobok.page) || 0;
    }
    
    // Calculate Sat Sobok total
    if (day.satSobok?.amount) {
      totalSatSobok += parseInt(day.satSobok.amount) || 0;
    }
    
    // Calculate Sabak Amukta total
    if (day.sabakAmukta?.page) {
      totalSabakAmukta += parseInt(day.sabakAmukta.page) || 0;
    }
    
    // Calculate Tilawat total
    if (day.tilawaAmount) {
      totalTilawat += parseInt(day.tilawaAmount) || 0;
    }
    
    // Calculate Revision total (only from Thursday)
    if (day.thursdayWeeklyRevision) {
      totalRevision += parseInt(day.thursdayWeeklyRevision) || 0;
    }
  });

  return {
    totalSobok,
    totalSatSobok,
    totalSabakAmukta,
    totalTilawat,
    totalRevision
  };
};

const createSobokiDailyReport = async (payload: ISobokiDailyReport, userId?: string) => {
  const weeklySummary = calculateWeeklySummary(payload.dailyEntries);

  const reportData = {
    ...payload,
    weeklySummary,
    ...(userId && { createdBy: userId }),
  };

  const result = await SobokiDailyReportModel.create(reportData);
  return result;
};

const getAllSobokiDailyReports = async (query: Record<string, unknown>) => {
  const sobokiDailyReportQuery = new QueryBuilder(
    SobokiDailyReportModel.find(),
    query,
  )
    .search(['teacherName', 'studentName', 'month'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await sobokiDailyReportQuery.countTotal();
  const data = await sobokiDailyReportQuery.modelQuery;

  return { meta, data };
};

const getSingleSobokiDailyReport = async (id: string) => {
  const result = await SobokiDailyReportModel.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Soboki Daily Report not found');
  }
  return result;
};

const updateSobokiDailyReport = async (
  id: string,
  payload: Partial<ISobokiDailyReport>,
  userId?: string
) => {
  const existingReport = await SobokiDailyReportModel.findById(id);
  if (!existingReport) {
    throw new AppError(httpStatus.NOT_FOUND, 'Soboki Daily Report not found');
  }

  let updateData = { ...payload };
  if (payload.dailyEntries) {
    const weeklySummary = calculateWeeklySummary(payload.dailyEntries);
    updateData = { ...updateData, weeklySummary };
  }

  const result = await SobokiDailyReportModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update Soboki Daily Report');
  }

  return result;
};

const deleteSobokiDailyReport = async (id: string) => {
  const result = await SobokiDailyReportModel.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Soboki Daily Report not found or already deleted');
  }

  return result;
};

const getReportsByStudent = async (studentName: string, query: Record<string, unknown>) => {
  const sobokiDailyReportQuery = new QueryBuilder(
    SobokiDailyReportModel.find({ studentName }).populate('createdBy', 'name email'),
    query,
  )
    .filter()
    .sort()
    .paginate();

  const meta = await sobokiDailyReportQuery.countTotal();
  const data = await sobokiDailyReportQuery.modelQuery;

  return { meta, data };
};

export const sobokiDailyReportServices = {
  createSobokiDailyReport,
  getAllSobokiDailyReports,
  getSingleSobokiDailyReport,
  updateSobokiDailyReport,
  deleteSobokiDailyReport,
  getReportsByStudent,
};