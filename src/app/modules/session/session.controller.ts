/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import { sessionServices } from './session.service';
import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';

const createSession = catchAsync(async (req, res, next) => {
  const result = await sessionServices.createSession(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Session created successfully',
    data: result,
  });
});

const getAllSessions = catchAsync(async (req, res, next) => {
  const result = await sessionServices.getAllSessions();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sessions retrieved successfully',
    data: result,
  });
});

const getSingleSession = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await sessionServices.getSingleSession(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Session retrieved successfully',
    data: result,
  });
});

const updateSession = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await sessionServices.updateSession(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Session updated successfully',
    data: result,
  });
});

const deleteSession = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await sessionServices.deleteSession(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Session deleted successfully',
    data: result,
  });
});

export const sessionControllers = {
  createSession,
  getAllSessions,
  getSingleSession,
  updateSession,
  deleteSession,
};
