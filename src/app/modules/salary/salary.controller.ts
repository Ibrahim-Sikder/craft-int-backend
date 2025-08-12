// src/modules/salary/salary.controller.ts

/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import { salaryServices } from './salary.service';
import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';

const createSalary = catchAsync(async (req, res, next) => {
  console.log('from body ', req.body);
  const result = await salaryServices.createSalary(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Salary record created successfully',
    data: result,
  });
});

const getAllSalaries = catchAsync(async (req, res, next) => {
  const result = await salaryServices.getAllSalaries(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Salaries retrieved successfully',
    data: result,
  });
});

const getSingleSalary = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await salaryServices.getSingleSalary(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Salary record retrieved successfully',
    data: result,
  });
});

const updateSalary = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await salaryServices.updateSalary(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Salary record updated successfully',
    data: result,
  });
});

const deleteSalary = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await salaryServices.deleteSalary(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Salary record deleted successfully',
    data: result,
  });
});

export const salaryControllers = {
  createSalary,
  getAllSalaries,
  getSingleSalary,
  updateSalary,
  deleteSalary,
};
