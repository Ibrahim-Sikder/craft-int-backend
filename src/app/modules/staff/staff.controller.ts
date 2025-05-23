import httpStatus from 'http-status';
import { staffServices } from './staff.service';
import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';
import { Request, Response } from 'express';

// Create new staff
const createStaff = catchAsync(async (req: Request, res: Response) => {
  const staff = await staffServices.createStaff(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Staff created successfully',
    data: staff,
  });
});

// Get all staff
const getAllStaff = catchAsync(async (req: Request, res: Response) => {
  const result = await staffServices.getAllStaff(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Staff members retrieved successfully',
    data: result,
  });
});

// Get single staff member
const getSingleStaff = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const staff = await staffServices.getSingleStaff(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Staff member retrieved successfully',
    data: staff,
  });
});

// Update staff
const updateStaff = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedStaff = await staffServices.updateStaff(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Staff updated successfully',
    data: updatedStaff,
  });
});

// Delete staff
const deleteStaff = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedStaff = await staffServices.deleteStaff(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Staff deleted successfully',
    data: deletedStaff,
  });
});

export const staffControllers = {
  createStaff,
  getAllStaff,
  getSingleStaff,
  updateStaff,
  deleteStaff,
};
