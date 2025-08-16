import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { HifzClassReport } from './model';
import { IHifzClassReport } from './interface';

const createHifzClassReport = async (payload: IHifzClassReport) => {
  const result = await HifzClassReport.create(payload);
  return result;
};

const getAllHifzClassReports = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(HifzClassReport.find(), query)
    .search(['name'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await queryBuilder.countTotal();
  const data = await queryBuilder.modelQuery;

  return { meta, data };
};

const getSingleHifzClassReport = async (id: string) => {
  const result = await HifzClassReport.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'HifzClassReport not found');
  }
  return result;
};

const updateHifzClassReport = async (id: string, payload: Partial<IHifzClassReport>) => {
  const result = await HifzClassReport.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update hifzClassReport');
  }
  return result;
};

const deleteHifzClassReport = async (id: string) => {
  const result = await HifzClassReport.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'HifzClassReport not found or already deleted');
  }
  return result;
};

export const hifzClassReportServices = {
  createHifzClassReport,
  getAllHifzClassReports,
  getSingleHifzClassReport,
  updateHifzClassReport,
  deleteHifzClassReport,
};
