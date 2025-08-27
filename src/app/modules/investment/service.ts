import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { Investment } from './model';
import { TInvestment } from './interface';

const createInvestment = async (payload: TInvestment) => {
  const result = await Investment.create(payload);
  return result;
};

const getAllInvestments = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(Investment.find(), query)
    .search(['name'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await queryBuilder.countTotal();
  const investments = await queryBuilder.modelQuery;

  return { meta, investments };
};

const getSingleInvestment = async (id: string) => {
  const result = await Investment.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Investment not found');
  }
  return result;
};

const updateInvestment = async (id: string, payload: Partial<TInvestment>) => {
  const result = await Investment.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update investment');
  }
  return result;
};

const deleteInvestment = async (id: string) => {
  const result = await Investment.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Investment not found or already deleted');
  }
  return result;
};

export const investmentServices = {
  createInvestment,
  getAllInvestments,
  getSingleInvestment,
  updateInvestment,
  deleteInvestment,
};
