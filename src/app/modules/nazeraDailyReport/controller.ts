import httpStatus from 'http-status';
import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';
import { nazeraDailyReportServices } from './service';

const createNazeraDailyReport = catchAsync(async (req, res) => {
  const result = await nazeraDailyReportServices.createNazeraDailyReport(req.body, req.user?.id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Nazera Daily Report created successfully',
    data: result,
  });
});

const getAllNazeraDailyReports = catchAsync(async (req, res) => {
  const result = await nazeraDailyReportServices.getAllNazeraDailyReports(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Nazera Daily Reports retrieved successfully',
    data: result,
  });
});

const getSingleNazeraDailyReport = catchAsync(async (req, res) => {
  const result = await nazeraDailyReportServices.getSingleNazeraDailyReport(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Nazera Daily Report retrieved successfully',
    data: result,
  });
});

const updateNazeraDailyReport = catchAsync(async (req, res) => {
  const result = await nazeraDailyReportServices.updateNazeraDailyReport(req.params.id, req.body, req.user?.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Nazera Daily Report updated successfully',
    data: result,
  });
});

const deleteNazeraDailyReport = catchAsync(async (req, res) => {
  const result = await nazeraDailyReportServices.deleteNazeraDailyReport(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Nazera Daily Report deleted successfully',
    data: result,
  });
});

const getReportsByStudent = catchAsync(async (req, res) => {
  const result = await nazeraDailyReportServices.getReportsByStudent(req.params.studentName, req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reports by student retrieved successfully',
    data: result,
  });
});

export const nazeraDailyReportControllers = {
  createNazeraDailyReport,
  getAllNazeraDailyReports,
  getSingleNazeraDailyReport,
  updateNazeraDailyReport,
  deleteNazeraDailyReport,
  getReportsByStudent,
};