import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { Loan } from './model';
import { TLoan } from './interface';

const createLoan = async (payload: TLoan) => {
  const result = await Loan.create(payload);
  return result;
};

const getAllLoans = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(Loan.find(), query)
    .search(['name'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await queryBuilder.countTotal();
  const data = await queryBuilder.modelQuery;

  return { meta, data };
};

const getSingleLoan = async (id: string) => {
  const result = await Loan.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Loan not found');
  }
  return result;
};

const updateLoan = async (id: string, payload: Partial<TLoan>) => {
  const result = await Loan.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update loan');
  }
  return result;
};

const deleteLoan = async (id: string) => {
  const result = await Loan.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Loan not found or already deleted');
  }
  return result;
};

export const loanServices = {
  createLoan,
  getAllLoans,
  getSingleLoan,
  updateLoan,
  deleteLoan,
};
