import httpStatus from 'http-status';
import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';
import { expenseCategoryServices } from './service';

const createExpenseCategory = catchAsync(async (req, res) => {
  const result = await expenseCategoryServices.createExpenseCategory(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'ExpenseCategory created successfully',
    data: result,
  });
});

const getAllExpenseCategorys = catchAsync(async (req, res) => {
  const result = await expenseCategoryServices.getAllExpenseCategorys(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ExpenseCategorys retrieved successfully',
    data: result,
  });
});

const getSingleExpenseCategory = catchAsync(async (req, res) => {
  const result = await expenseCategoryServices.getSingleExpenseCategory(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ExpenseCategory retrieved successfully',
    data: result,
  });
});

const updateExpenseCategory = catchAsync(async (req, res) => {
  const result = await expenseCategoryServices.updateExpenseCategory(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ExpenseCategory updated successfully',
    data: result,
  });
});

const deleteExpenseCategory = catchAsync(async (req, res) => {
  const result = await expenseCategoryServices.deleteExpenseCategory(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ExpenseCategory deleted successfully',
    data: result,
  });
});

export const expenseCategoryControllers = {
  createExpenseCategory,
  getAllExpenseCategorys,
  getSingleExpenseCategory,
  updateExpenseCategory,
  deleteExpenseCategory,
};
