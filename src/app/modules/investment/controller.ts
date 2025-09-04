// investment/controller.ts
import httpStatus from 'http-status';
import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';
import { investmentServices } from './service';

const createInvestment = catchAsync(async (req, res) => {
  const result = await investmentServices.createInvestment(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Investment created successfully',
    data: result,
  });
});

const getAllInvestments = catchAsync(async (req, res) => {
  const result = await investmentServices.getAllInvestments(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Investments retrieved successfully',
    data: result,
  });
});

const getSingleInvestment = catchAsync(async (req, res) => {
  const result = await investmentServices.getSingleInvestment(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Investment retrieved successfully',
    data: result,
  });
});

const updateInvestment = catchAsync(async (req, res) => {
  const result = await investmentServices.updateInvestment(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Investment updated successfully',
    data: result,
  });
});

const deleteInvestment = catchAsync(async (req, res) => {
  const result = await investmentServices.deleteInvestment(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Investment deleted successfully',
    data: result,
  });
});

const addReturn = catchAsync(async (req, res) => {
  const result = await investmentServices.addInvestmentReturn(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Investment return added successfully',
    data: result,
  });
});

const closeInvestment = catchAsync(async (req, res) => {
  const result = await investmentServices.closeInvestment(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Investment closed successfully',
    data: result,
  });
});

const getPerformance = catchAsync(async (req, res) => {
  const result = await investmentServices.calculateInvestmentPerformance(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Investment performance calculated successfully',
    data: result,
  });
});

export const investmentControllers = {
  createInvestment,
  getAllInvestments,
  getSingleInvestment,
  updateInvestment,
  deleteInvestment,
  addReturn,
  closeInvestment,
  getPerformance
};