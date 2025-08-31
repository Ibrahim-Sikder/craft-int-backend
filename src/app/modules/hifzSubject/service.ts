import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { HifzSubject } from './model';
import { IHifzSubject } from './interface';

const createHifzSubject = async (payload: IHifzSubject) => {
  const result = await HifzSubject.create(payload);
  return result;
};

const getAllHifzSubjects = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(HifzSubject.find(), query)
    .search(['name'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await queryBuilder.countTotal();
  const data = await queryBuilder.modelQuery;

  return { meta, data };
};

const getSingleHifzSubject = async (id: string) => {
  const result = await HifzSubject.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'HifzSubject not found');
  }
  return result;
};

const updateHifzSubject = async (id: string, payload: Partial<IHifzSubject>) => {
  const result = await HifzSubject.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update hifzSubject');
  }
  return result;
};

const deleteHifzSubject = async (id: string) => {
  const result = await HifzSubject.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'HifzSubject not found or already deleted');
  }
  return result;
};

export const hifzSubjectServices = {
  createHifzSubject,
  getAllHifzSubjects,
  getSingleHifzSubject,
  updateHifzSubject,
  deleteHifzSubject,
};
