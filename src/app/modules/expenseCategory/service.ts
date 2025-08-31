import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { ExpenseCategory } from './model';
import { IExpenseCategory } from './interface';

const createExpenseCategory = async (payload: IExpenseCategory) => {
  const result = await ExpenseCategory.create(payload);
  return result;
};

const getAllExpenseCategorys = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(ExpenseCategory.find(), query)
    .search(['name'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await queryBuilder.countTotal();
  const data = await queryBuilder.modelQuery;

  return { meta, data };
};

const getSingleExpenseCategory = async (id: string) => {
  const result = await ExpenseCategory.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'ExpenseCategory not found');
  }
  return result;
};

const updateExpenseCategory = async (id: string, payload: Partial<IExpenseCategory>) => {
  const result = await ExpenseCategory.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update expenseCategory');
  }
  return result;
};

const deleteExpenseCategory = async (id: string) => {
  const result = await ExpenseCategory.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'ExpenseCategory not found or already deleted');
  }
  return result;
};

export const expenseCategoryServices = {
  createExpenseCategory,
  getAllExpenseCategorys,
  getSingleExpenseCategory,
  updateExpenseCategory,
  deleteExpenseCategory,
};
