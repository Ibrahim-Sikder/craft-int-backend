/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { ISunaniReport } from './interface';
import { SunaniReportModel } from './model';
import QueryBuilder from '../../builder/QueryBuilder';

// Calculate weekly summary from daily entries
const calculateWeeklySummary = (dailyEntries: ISunaniReport['dailyEntries']) => {
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

const createSunaniReport = async (payload: ISunaniReport, userId?: string) => {
  const weeklySummary = calculateWeeklySummary(payload.dailyEntries);

  const reportData = {
    ...payload,
    weeklySummary,
    ...(userId && { createdBy: userId }),
  };

  const result = await SunaniReportModel.create(reportData);
  return result;
};

const getAllSunaniReports = async (query: Record<string, unknown>) => {
  const sunaniReportQuery = new QueryBuilder(
    SunaniReportModel.find(),
    query,
  )
    .search(['teacherName', 'studentName', 'month'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await sunaniReportQuery.countTotal();
  const data = await sunaniReportQuery.modelQuery;

  return { meta, data };
};

const getSingleSunaniReport = async (id: string) => {
  const result = await SunaniReportModel.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Sunani Report not found');
  }
  return result;
};

const updateSunaniReport = async (
  id: string,
  payload: Partial<ISunaniReport>,
  userId?: string
) => {
  const existingReport = await SunaniReportModel.findById(id);
  if (!existingReport) {
    throw new AppError(httpStatus.NOT_FOUND, 'Sunani Report not found');
  }

  let updateData = { ...payload };
  if (payload.dailyEntries) {
    const weeklySummary = calculateWeeklySummary(payload.dailyEntries);
    updateData = { ...updateData, weeklySummary };
  }

  const result = await SunaniReportModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update Sunani Report');
  }

  return result;
};

const deleteSunaniReport = async (id: string) => {
  const result = await SunaniReportModel.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Sunani Report not found or already deleted');
  }

  return result;
};

const getReportsByStudent = async (studentName: string, query: Record<string, unknown>) => {
  const sunaniReportQuery = new QueryBuilder(
    SunaniReportModel.find({ studentName }).populate('createdBy', 'name email'),
    query,
  )
    .filter()
    .sort()
    .paginate();

  const meta = await sunaniReportQuery.countTotal();
  const data = await sunaniReportQuery.modelQuery;

  return { meta, data };
};

export const sunaniReportServices = {
  createSunaniReport,
  getAllSunaniReports,
  getSingleSunaniReport,
  updateSunaniReport,
  deleteSunaniReport,
  getReportsByStudent,
};