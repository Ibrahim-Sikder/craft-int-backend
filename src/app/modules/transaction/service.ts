import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { Transaction } from './model';
import { TTransaction } from './interface';

const createTransaction = async (payload: TTransaction) => {
  const result = await Transaction.create(payload);
  return result;
};

const getAllTransactions = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(Transaction.find(), query)
    .search(['name'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await queryBuilder.countTotal();
  const data = await queryBuilder.modelQuery;

  return { meta, data };
};

const getSingleTransaction = async (id: string) => {
  const result = await Transaction.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Transaction not found');
  }
  return result;
};

const updateTransaction = async (id: string, payload: Partial<TTransaction>) => {
  const result = await Transaction.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update transaction');
  }
  return result;
};

const deleteTransaction = async (id: string) => {
  const result = await Transaction.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Transaction not found or already deleted');
  }
  return result;
};

export const transactionServices = {
  createTransaction,
  getAllTransactions,
  getSingleTransaction,
  updateTransaction,
  deleteTransaction,
};
