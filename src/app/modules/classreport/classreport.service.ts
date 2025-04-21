import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../error/AppError';
import { IClassReport } from './classreport.interface';
import { ClassReport } from './classreport.model';
import { classReportSearchableFields } from './classreport.constant';

const createClassReport = async (payload: IClassReport) => {
  if (!payload.teacherId || !payload.classId || !payload.subjectId) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Missing required fields');
  }

  const result = await ClassReport.create(payload);
  return result;
};

const getAllClassReports = async (query: Record<string, unknown>) => {
  const reportQuery = new QueryBuilder(ClassReport.find(), query)
    .search(classReportSearchableFields)
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

const getSingleClassReport = async (id: string) => {
  const result = await ClassReport.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Class report not found');
  }
  return result;
};

const updateClassReport = async (id: string, payload: Partial<IClassReport>) => {
  const result = await ClassReport.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update class report');
  }
  return result;
};

const deleteClassReport = async (id: string) => {
  const result = await ClassReport.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Class report not found or already deleted');
  }
  return result;
};

export const classReportServices = {
  createClassReport,
  getAllClassReports,
  getSingleClassReport,
  updateClassReport,
  deleteClassReport,
};
