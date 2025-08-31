/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import { notificationServices } from './notification.service';
import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';

const createNotification = catchAsync(async (req, res, next) => {
  const result = await notificationServices.createNotification(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Notification created successfully',
    data: result,
  });
});

const getAllNotifications = catchAsync(async (req, res, next) => {
  const result = await notificationServices.getAllNotifications();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notifications retrieved successfully',
    data: result,
  });
});

const getSingleNotification = catchAsync(async (req, res, next) => {
  const result = await notificationServices.getSingleNotification(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification retrieved successfully',
    data: result,
  });
});

const updateNotification = catchAsync(async (req, res, next) => {
  const result = await notificationServices.updateNotification(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification updated successfully',
    data: result,
  });
});

const deleteNotification = catchAsync(async (req, res, next) => {
  const result = await notificationServices.deleteNotification(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification deleted successfully',
    data: result,
  });
});

export const notificationControllers = {
  createNotification,
  getAllNotifications,
  getSingleNotification,
  updateNotification,
  deleteNotification,
};
