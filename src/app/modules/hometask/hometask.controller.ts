/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';
import { homeTaskServices } from './hometask.service';

const createHomeTask = catchAsync(async (req, res, next) => {
  const result = await homeTaskServices.createHomeTask(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Home task created successfully',
    data: result,
  });
});

const getAllHomeTasks = catchAsync(async (req, res, next) => {
  const result = await homeTaskServices.getAllHomeTasks();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Home tasks retrieved successfully',
    data: result,
  });
});

const getSingleHomeTask = catchAsync(async (req, res, next) => {
  const result = await homeTaskServices.getSingleHomeTask(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Home task retrieved successfully',
    data: result,
  });
});

const updateHomeTask = catchAsync(async (req, res, next) => {
  const result = await homeTaskServices.updateHomeTask(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Home task updated successfully',
    data: result,
  });
});

const deleteHomeTask = catchAsync(async (req, res, next) => {
  const result = await homeTaskServices.deleteHomeTask(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Home task deleted successfully',
    data: result,
  });
});

export const homeTaskControllers = {
  createHomeTask,
  getAllHomeTasks,
  getSingleHomeTask,
  updateHomeTask,
  deleteHomeTask,
};
