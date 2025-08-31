import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { IncomeCategory } from './model';
import { IIncomeCategory } from './interface';

const createIncomeCategory = async (payload: IIncomeCategory) => {
  const result = await IncomeCategory.create(payload);
  return result;
};

const getAllIncomeCategorys = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(IncomeCategory.find(), query)
    .search(['name'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await queryBuilder.countTotal();
  const data = await queryBuilder.modelQuery;

  return { meta, data };
};

const getSingleIncomeCategory = async (id: string) => {
  const result = await IncomeCategory.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'IncomeCategory not found');
  }
  return result;
};

const updateIncomeCategory = async (id: string, payload: Partial<IIncomeCategory>) => {
  const result = await IncomeCategory.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update incomeCategory');
  }
  return result;
};

const deleteIncomeCategory = async (id: string) => {
  const result = await IncomeCategory.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'IncomeCategory not found or already deleted');
  }
  return result;
};

export const incomeCategoryServices = {
  createIncomeCategory,
  getAllIncomeCategorys,
  getSingleIncomeCategory,
  updateIncomeCategory,
  deleteIncomeCategory,
};
