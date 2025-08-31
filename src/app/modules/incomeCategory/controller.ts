import httpStatus from 'http-status';
import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';
import { incomeCategoryServices } from './service';

const createIncomeCategory = catchAsync(async (req, res) => {
  const result = await incomeCategoryServices.createIncomeCategory(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'IncomeCategory created successfully',
    data: result,
  });
});

const getAllIncomeCategorys = catchAsync(async (req, res) => {
  const result = await incomeCategoryServices.getAllIncomeCategorys(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'IncomeCategorys retrieved successfully',
    data: result,
  });
});

const getSingleIncomeCategory = catchAsync(async (req, res) => {
  const result = await incomeCategoryServices.getSingleIncomeCategory(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'IncomeCategory retrieved successfully',
    data: result,
  });
});

const updateIncomeCategory = catchAsync(async (req, res) => {
  const result = await incomeCategoryServices.updateIncomeCategory(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'IncomeCategory updated successfully',
    data: result,
  });
});

const deleteIncomeCategory = catchAsync(async (req, res) => {
  const result = await incomeCategoryServices.deleteIncomeCategory(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'IncomeCategory deleted successfully',
    data: result,
  });
});

export const incomeCategoryControllers = {
  createIncomeCategory,
  getAllIncomeCategorys,
  getSingleIncomeCategory,
  updateIncomeCategory,
  deleteIncomeCategory,
};
