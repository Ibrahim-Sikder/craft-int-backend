import httpStatus from 'http-status';
import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';
import { sobokiDailyReportServices } from './service';

const createSobokiDailyReport = catchAsync(async (req, res) => {
  console.log(req.body)
  const result = await sobokiDailyReportServices.createSobokiDailyReport(req.body, req.user?.id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Soboki Daily Report created successfully',
    data: result,
  });
});

const getAllSobokiDailyReports = catchAsync(async (req, res) => {
  const result = await sobokiDailyReportServices.getAllSobokiDailyReports(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Soboki Daily Reports retrieved successfully',
    data: result,
  });
});

const getSingleSobokiDailyReport = catchAsync(async (req, res) => {
  const result = await sobokiDailyReportServices.getSingleSobokiDailyReport(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Soboki Daily Report retrieved successfully',
    data: result,
  });
});

const updateSobokiDailyReport = catchAsync(async (req, res) => {
  const result = await sobokiDailyReportServices.updateSobokiDailyReport(req.params.id, req.body, req.user?.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Soboki Daily Report updated successfully',
    data: result,
  });
});

const deleteSobokiDailyReport = catchAsync(async (req, res) => {
  const result = await sobokiDailyReportServices.deleteSobokiDailyReport(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Soboki Daily Report deleted successfully',
    data: result,
  });
});

const getReportsByStudent = catchAsync(async (req, res) => {
  const result = await sobokiDailyReportServices.getReportsByStudent(req.params.studentName, req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reports by student retrieved successfully',
    data: result,
  });
});

export const sobokiDailyReportControllers = {
  createSobokiDailyReport,
  getAllSobokiDailyReports,
  getSingleSobokiDailyReport,
  updateSobokiDailyReport,
  deleteSobokiDailyReport,
  getReportsByStudent,
};