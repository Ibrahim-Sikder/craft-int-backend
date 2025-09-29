/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { IAmparaDailyReport } from './interface';
import { AmparaDailyReportModel } from './model';
import QueryBuilder from '../../builder/QueryBuilder';

// Calculate weekly summary from daily entries
const calculateWeeklySummary = (dailyEntries: IAmparaDailyReport['dailyEntries']) => {
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

const createAmparaDailyReport = async (payload: IAmparaDailyReport, userId?: string) => {
  const weeklySummary = calculateWeeklySummary(payload.dailyEntries);

  const reportData = {
    ...payload,
    weeklySummary,
    ...(userId && { createdBy: userId }),
  };

  const result = await AmparaDailyReportModel.create(reportData);
  return result;
};

const getAllAmparaDailyReports = async (query: Record<string, unknown>) => {
  const amparaDailyReportQuery = new QueryBuilder(
    AmparaDailyReportModel.find(),
    query,
  )
    .search(['teacherName', 'studentName', 'month'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await amparaDailyReportQuery.countTotal();
  const data = await amparaDailyReportQuery.modelQuery;

  return { meta, data };
};

const getSingleAmparaDailyReport = async (id: string) => {
  const result = await AmparaDailyReportModel.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Ampara Daily Report not found');
  }
  return result;
};

const updateAmparaDailyReport = async (
  id: string,
  payload: Partial<IAmparaDailyReport>,
  userId?: string
) => {
  const existingReport = await AmparaDailyReportModel.findById(id);
  if (!existingReport) {
    throw new AppError(httpStatus.NOT_FOUND, 'Ampara Daily Report not found');
  }

  let updateData = { ...payload };
  if (payload.dailyEntries) {
    const weeklySummary = calculateWeeklySummary(payload.dailyEntries);
    updateData = { ...updateData, weeklySummary };
  }

  const result = await AmparaDailyReportModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update Ampara Daily Report');
  }

  return result;
};

const deleteAmparaDailyReport = async (id: string) => {
  const result = await AmparaDailyReportModel.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Ampara Daily Report not found or already deleted');
  }

  return result;
};

const getReportsByStudent = async (studentName: string, query: Record<string, unknown>) => {
  const amparaDailyReportQuery = new QueryBuilder(
    AmparaDailyReportModel.find({ studentName }).populate('createdBy', 'name email'),
    query,
  )
    .filter()
    .sort()
    .paginate();

  const meta = await amparaDailyReportQuery.countTotal();
  const data = await amparaDailyReportQuery.modelQuery;

  return { meta, data };
};

export const amparaDailyReportServices = {
  createAmparaDailyReport,
  getAllAmparaDailyReports,
  getSingleAmparaDailyReport,
  updateAmparaDailyReport,
  deleteAmparaDailyReport,
  getReportsByStudent,
};