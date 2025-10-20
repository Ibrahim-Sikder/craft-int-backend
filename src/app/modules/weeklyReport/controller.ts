import httpStatus from 'http-status';
import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';
import { weeklyReportServices } from './service';

const createWeeklyReport = catchAsync(async (req, res) => {

  console.log(req.body)
  const result = await weeklyReportServices.createWeeklyReport(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Weekly Report created successfully',
    data: result,
  });
});

const getAllWeeklyReports = catchAsync(async (req, res) => {
  const result = await weeklyReportServices.getAllWeeklyReports(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Weekly Reports retrieved successfully',
    data: result,
  });
});

const getSingleWeeklyReport = catchAsync(async (req, res) => {
  const result = await weeklyReportServices.getSingleWeeklyReport(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Weekly Report retrieved successfully',
    data: result,
  });
});

const updateWeeklyReport = catchAsync(async (req, res) => {
  const result = await weeklyReportServices.updateWeeklyReport(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Weekly Report updated successfully',
    data: result,
  });
});

const deleteWeeklyReport = catchAsync(async (req, res) => {
  const result = await weeklyReportServices.deleteWeeklyReport(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Weekly Report deleted successfully',
    data: result,
  });
});

export const weeklyReportControllers = {
  createWeeklyReport,
  getAllWeeklyReports,
  getSingleWeeklyReport,
  updateWeeklyReport,
  deleteWeeklyReport,
};
