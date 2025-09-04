// loan/controller.ts
import httpStatus from 'http-status';
import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';
import { loanServices } from './service';

const createLoan = catchAsync(async (req, res) => {
  const result = await loanServices.createLoan(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Loan created successfully',
    data: result,
  });
});

const getAllLoans = catchAsync(async (req, res) => {
  const result = await loanServices.getAllLoans(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Loans retrieved successfully',
    data: result,
  });
});

const getSingleLoan = catchAsync(async (req, res) => {
  const result = await loanServices.getSingleLoan(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Loan retrieved successfully',
    data: result,
  });
});

const updateLoan = catchAsync(async (req, res) => {
  const result = await loanServices.updateLoan(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Loan updated successfully',
    data: result,
  });
});

const deleteLoan = catchAsync(async (req, res) => {
  const result = await loanServices.deleteLoan(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Loan deleted successfully',
    data: result,
  });
});

const addRepayment = catchAsync(async (req, res) => {
  const result = await loanServices.addRepayment(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Repayment added successfully',
    data: result,
  });
});

const transferLoan = catchAsync(async (req, res) => {
  const result = await loanServices.transferLoan(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Loan transferred successfully',
    data: result,
  });
});

const getAmortization = catchAsync(async (req, res) => {
  const result = await loanServices.calculateLoanAmortization(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Loan amortization calculated successfully',
    data: result,
  });
});

export const loanControllers = {
  createLoan,
  getAllLoans,
  getSingleLoan,
  updateLoan,
  deleteLoan,
  addRepayment,
  transferLoan,
  getAmortization
};