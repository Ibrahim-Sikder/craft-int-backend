/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import { roomServices } from './room.service';
import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';

const createRoom = catchAsync(async (req, res, next) => {
  const result = await roomServices.createRoom(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Room created successfully',
    data: result,
  });
});

const getAllRooms = catchAsync(async (req, res, next) => {
  const result = await roomServices.getAllRooms(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rooms retrieved successfully',
    data: result,
  });
});

const getSingleRoom = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await roomServices.getSingleRoom(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room retrieved successfully',
    data: result,
  });
});

const updateRoom = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await roomServices.updateRoom(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room updated successfully',
    data: result,
  });
});

const deleteRoom = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await roomServices.deleteRoom(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room deleted successfully',
    data: result,
  });
});

export const roomControllers = {
  createRoom,
  getAllRooms,
  getSingleRoom,
  updateRoom,
  deleteRoom,
};
