import httpStatus from 'http-status';
import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';
import { transactionServices } from './service';

const createTransaction = catchAsync(async (req, res) => {
  const result = await transactionServices.createTransaction(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Transaction created successfully',
    data: result,
  });
});

const getAllTransactions = catchAsync(async (req, res) => {
  const result = await transactionServices.getAllTransactions(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transactions retrieved successfully',
    data: result,
  });
});

const getSingleTransaction = catchAsync(async (req, res) => {
  const result = await transactionServices.getSingleTransaction(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transaction retrieved successfully',
    data: result,
  });
});

const updateTransaction = catchAsync(async (req, res) => {
  const result = await transactionServices.updateTransaction(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transaction updated successfully',
    data: result,
  });
});

const deleteTransaction = catchAsync(async (req, res) => {
  const result = await transactionServices.deleteTransaction(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transaction deleted successfully',
    data: result,
  });
});

export const transactionControllers = {
  createTransaction,
  getAllTransactions,
  getSingleTransaction,
  updateTransaction,
  deleteTransaction,
};
