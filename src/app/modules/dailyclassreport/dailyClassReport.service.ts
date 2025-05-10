import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { TDailyClassReport } from './dailyClassReport.interface';
import { DailyClassReport } from './dailyClassReport.model';
import { dailyClassReportSearch } from './dailyClassReport.constant';

const createDailyClassReport = async (payload: TDailyClassReport) => {
  const result = await DailyClassReport.create(payload);
  return result;
};

const getAllDailyClassReports = async (query: Record<string, unknown>) => {
  const reportQuery = new QueryBuilder(DailyClassReport.find(), query)
    .search(dailyClassReportSearch)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await reportQuery.countTotal();
  const reports = await reportQuery.modelQuery;

  return {
    meta,
    reports,
  };
};

const getSingleDailyClassReport = async (id: string) => {
  const result = await DailyClassReport.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Report not found');
  }

  return result;
};

const updateDailyClassReport = async (
  id: string,
  payload: Partial<TDailyClassReport>,
) => {
  console.log(payload);
  const result = await DailyClassReport.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update report');
  }

  return result;
};

const deleteDailyClassReport = async (id: string) => {
  const result = await DailyClassReport.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Report not found or already deleted',
    );
  }
  return result;
};

export const dailyClassReportServices = {
  createDailyClassReport,
  getAllDailyClassReports,
  getSingleDailyClassReport,
  updateDailyClassReport,
  deleteDailyClassReport,
};
