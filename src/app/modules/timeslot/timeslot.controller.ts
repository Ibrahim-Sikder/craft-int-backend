/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';

import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';
import { timeSlotServices } from './timeslot.service';

const createTimeSlot = catchAsync(async (req, res, next) => {
  const result = await timeSlotServices.createTimeSlot(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Time slot created successfully',
    data: result,
  });
});

const getAllTimeSlots = catchAsync(async (req, res, next) => {
  const result = await timeSlotServices.getAllTimeSlots(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Time slots retrieved successfully',
    data: result,
  });
});

const getSingleTimeSlot = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await timeSlotServices.getSingleTimeSlot(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Time slot retrieved successfully',
    data: result,
  });
});

const updateTimeSlot = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await timeSlotServices.updateTimeSlot(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Time slot updated successfully',
    data: result,
  });
});

const deleteTimeSlot = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await timeSlotServices.deleteTimeSlot(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Time slot deleted successfully',
    data: result,
  });
});

export const timeSlotControllers = {
  createTimeSlot,
  getAllTimeSlots,
  getSingleTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
};
