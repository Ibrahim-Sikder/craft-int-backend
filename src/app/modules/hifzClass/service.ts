import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { HifzClass } from './model';
import { IHifzClass } from './interface';

const createHifzClass = async (payload: IHifzClass) => {
  const result = await HifzClass.create(payload);
  return result;
};

const getAllHifzClasss = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(HifzClass.find(), query)
    .search(['name'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await queryBuilder.countTotal();
  const data = await queryBuilder.modelQuery;

  return { meta, data };
};

const getSingleHifzClass = async (id: string) => {
  const result = await HifzClass.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'HifzClass not found');
  }
  return result;
};

const updateHifzClass = async (id: string, payload: Partial<IHifzClass>) => {
  const result = await HifzClass.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update hifzClass');
  }
  return result;
};

const deleteHifzClass = async (id: string) => {
  const result = await HifzClass.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'HifzClass not found or already deleted');
  }
  return result;
};

export const hifzClassServices = {
  createHifzClass,
  getAllHifzClasss,
  getSingleHifzClass,
  updateHifzClass,
  deleteHifzClass,
};
