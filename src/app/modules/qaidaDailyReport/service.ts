import httpStatus from "http-status";
import { AppError } from "../../error/AppError";
import { QaidaDailyReport } from "./model";
import { IQaidaDailyReport } from "./interface";
import { qaidaDailyReportSearchableFields } from "./constant";
import QueryBuilder from "../../builder/QueryBuilder";

const createQaidaDailyReport = async (payload: IQaidaDailyReport) => {
  const result = await QaidaDailyReport.create(payload);
  return result;
};

const getAllQaidaDailyReports = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(QaidaDailyReport.find(), query)
    .search(qaidaDailyReportSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await queryBuilder.countTotal();
  const data = await queryBuilder.modelQuery;

  return { meta, data };
};

const getSingleQaidaDailyReport = async (id: string) => {
  const result = await QaidaDailyReport.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "QaidaDailyReport not found");
  }
  return result;
};

const updateQaidaDailyReport = async (id: string, payload: Partial<IQaidaDailyReport>) => {
  const result = await QaidaDailyReport.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Failed to update qaidaDailyReport");
  }
  return result;
};

const deleteQaidaDailyReport = async (id: string) => {
  const result = await QaidaDailyReport.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "QaidaDailyReport not found or already deleted");
  }
  return result;
};

export const qaidaDailyReportServices = {
  createQaidaDailyReport,
  getAllQaidaDailyReports,
  getSingleQaidaDailyReport,
  updateQaidaDailyReport,
  deleteQaidaDailyReport,
};