import httpStatus from 'http-status';
import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';
import { sunaniReportServices } from './service';

const createSunaniReport = catchAsync(async (req, res) => {
  const result = await sunaniReportServices.createSunaniReport(req.body, req.user?.id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Sunani Report created successfully',
    data: result,
  });
});

const getAllSunaniReports = catchAsync(async (req, res) => {
  const result = await sunaniReportServices.getAllSunaniReports(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sunani Reports retrieved successfully',
    data: result,
  });
});

const getSingleSunaniReport = catchAsync(async (req, res) => {
  const result = await sunaniReportServices.getSingleSunaniReport(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sunani Report retrieved successfully',
    data: result,
  });
});

const updateSunaniReport = catchAsync(async (req, res) => {
  const result = await sunaniReportServices.updateSunaniReport(req.params.id, req.body, req.user?.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sunani Report updated successfully',
    data: result,
  });
});

const deleteSunaniReport = catchAsync(async (req, res) => {
  const result = await sunaniReportServices.deleteSunaniReport(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sunani Report deleted successfully',
    data: result,
  });
});

const getReportsByStudent = catchAsync(async (req, res) => {
  const result = await sunaniReportServices.getReportsByStudent(req.params.studentName, req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reports by student retrieved successfully',
    data: result,
  });
});

export const sunaniReportControllers = {
  createSunaniReport,
  getAllSunaniReports,
  getSingleSunaniReport,
  updateSunaniReport,
  deleteSunaniReport,
  getReportsByStudent,
};