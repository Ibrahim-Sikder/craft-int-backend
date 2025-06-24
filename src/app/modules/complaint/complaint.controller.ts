import { Request, Response } from 'express';
import { catchAsync } from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';
import { complaintServices } from './complaint.service';

const createComplaint = catchAsync(async (req: Request, res: Response) => {
  const result = await complaintServices.createComplaint(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Complaint submitted successfully',
    data: result,
  });
});

const getAllComplaints = catchAsync(async (req: Request, res: Response) => {
  const result = await complaintServices.getAllComplaints();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Complaints retrieved successfully',
    data: result,
  });
});

const getSingleComplaint = catchAsync(async (req: Request, res: Response) => {
  const result = await complaintServices.getSingleComplaint(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Complaint retrieved successfully',
    data: result,
  });
});

const updateComplaint = catchAsync(async (req: Request, res: Response) => {
  const result = await complaintServices.updateComplaint(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Complaint updated successfully',
    data: result,
  });
});

const deleteComplaint = catchAsync(async (req: Request, res: Response) => {
  const result = await complaintServices.deleteComplaint(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Complaint deleted successfully',
    data: result,
  });
});

export const complaintControllers = {
  createComplaint,
  getAllComplaints,
  getSingleComplaint,
  updateComplaint,
  deleteComplaint,
};
