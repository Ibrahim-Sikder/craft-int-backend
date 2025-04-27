/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import { catchAsync } from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { todayTaskServices } from './todaytask.service';

const createTodayTask = catchAsync(async (req, res, next) => {
  const result = await todayTaskServices.createTodayTask(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Today's task created successfully",
    data: result,
  });
});

const getAllTodayTasks = catchAsync(async (req, res) => {
  const result = await todayTaskServices.getAllTodayTasks(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All today's tasks retrieved successfully",
    data: result,
  });
});

const getSingleTodayTask = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await todayTaskServices.getSingleTodayTask(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Today's task retrieved successfully",
    data: result,
  });
});

const updateTodayTask = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await todayTaskServices.updateTodayTask(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Today's task updated successfully",
    data: result,
  });
});

const deleteTodayTask = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await todayTaskServices.deleteTodayTask(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Today's task deleted successfully",
    data: result,
  });
});

export const todayTaskControllers = {
  createTodayTask,
  getAllTodayTasks,
  getSingleTodayTask,
  updateTodayTask,
  deleteTodayTask,
};
