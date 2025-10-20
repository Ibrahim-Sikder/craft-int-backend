import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { IWeeklyReport, WeeklyReport } from './model';
import QueryBuilder from '../../builder/QueryBuilder';

const createWeeklyReport = async (payload: IWeeklyReport) => {
  const result = await WeeklyReport.create(payload);
  return result;
};

const getAllWeeklyReports = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(WeeklyReport.find(), query)
    .search([''])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await queryBuilder.countTotal();
  const data = await queryBuilder.modelQuery;

  return { meta, data };
};

const getSingleWeeklyReport = async (id: string) => {
  const result = await WeeklyReport.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Weekly Report not found');
  }
  return result;
};

const updateWeeklyReport = async (id: string, payload: Partial<IWeeklyReport>) => {
  const result = await WeeklyReport.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update Weekly Report');
  }
  return result;
};

const deleteWeeklyReport = async (id: string) => {
  const result = await WeeklyReport.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Weekly Report not found or already deleted');
  }
  return result;
};

export const weeklyReportServices = {
  createWeeklyReport,
  getAllWeeklyReports,
  getSingleWeeklyReport,
  updateWeeklyReport,
  deleteWeeklyReport,
};
