import httpStatus from 'http-status';
import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';
import { amparaDailyReportServices } from './service';

const createAmparaDailyReport = catchAsync(async (req, res) => {
  const result = await amparaDailyReportServices.createAmparaDailyReport(req.body, req.user?.id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Ampara Daily Report created successfully',
    data: result,
  });
});

const getAllAmparaDailyReports = catchAsync(async (req, res) => {
  const result = await amparaDailyReportServices.getAllAmparaDailyReports(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ampara Daily Reports retrieved successfully',
    data: result,
  });
});

const getSingleAmparaDailyReport = catchAsync(async (req, res) => {
  const result = await amparaDailyReportServices.getSingleAmparaDailyReport(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ampara Daily Report retrieved successfully',
    data: result,
  });
});

const updateAmparaDailyReport = catchAsync(async (req, res) => {
  const result = await amparaDailyReportServices.updateAmparaDailyReport(req.params.id, req.body, req.user?.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ampara Daily Report updated successfully',
    data: result,
  });
});

const deleteAmparaDailyReport = catchAsync(async (req, res) => {
  const result = await amparaDailyReportServices.deleteAmparaDailyReport(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ampara Daily Report deleted successfully',
    data: result,
  });
});

const getReportsByStudent = catchAsync(async (req, res) => {
  const result = await amparaDailyReportServices.getReportsByStudent(req.params.studentName, req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reports by student retrieved successfully',
    data: result,
  });
});

export const amparaDailyReportControllers = {
  createAmparaDailyReport,
  getAllAmparaDailyReports,
  getSingleAmparaDailyReport,
  updateAmparaDailyReport,
  deleteAmparaDailyReport,
  getReportsByStudent,
};