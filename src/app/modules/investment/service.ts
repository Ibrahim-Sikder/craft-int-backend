// investment/services.ts
import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { Investment } from './model';
import { TInvestment, TReturnHistory } from './interface';

const createInvestment = async (payload: TInvestment) => {
  const result = await Investment.create(payload);
  return result;
};

const getAllInvestments = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(Investment.find(), query)
    .search(['investmentTo', 'investorName', 'investmentType'])
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

const addInvestmentReturn = async (id: string, returnData: TReturnHistory) => {
  const investment = await Investment.findById(id);
  if (!investment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Investment not found');
  }
  
  // Initialize returnHistory if it doesn't exist
  if (!investment.returnHistory) {
    investment.returnHistory = [];
  }
  
  // Add the return to history
  investment.returnHistory.push(returnData);
  
  // Recalculate all values by saving (pre-save middleware will handle calculations)
  await investment.save();
  return investment;
};

const closeInvestment = async (id: string, finalReturn?: TReturnHistory) => {
  const investment = await Investment.findById(id);
  if (!investment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Investment not found');
  }
  
  if (finalReturn) {
    // Initialize returnHistory if it doesn't exist
    if (!investment.returnHistory) {
      investment.returnHistory = [];
    }
    investment.returnHistory.push(finalReturn);
  }
  
  investment.status = 'closed';
  await investment.save();
  return investment;
};


const calculateInvestmentPerformance = async (id: string) => {
  const investment = await Investment.findById(id);
  if (!investment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Investment not found');
  }
  
  // This will trigger the pre-save middleware to recalculate all values
  await investment.save();
  
  return {
    currentValue: investment.currentValue,
    totalReturns: investment.totalReturns,
    roi: investment.roi,
    annualizedReturn: investment.annualizedReturn,
    daysHeld: investment.daysHeld
  };
};

export const investmentServices = {
  createInvestment,
  getAllInvestments,
  getSingleInvestment,
  updateInvestment,
  deleteInvestment,
  addInvestmentReturn,
  closeInvestment,
  calculateInvestmentPerformance
};