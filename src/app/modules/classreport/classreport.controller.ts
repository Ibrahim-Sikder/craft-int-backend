import httpStatus from 'http-status';
import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';
import { classReportServices } from './classreport.service';

const createClassReport = catchAsync(async (req, res, next) => {
  try {
    const result = await classReportServices.createClassReport(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Class report created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const getAllClassReports = catchAsync(async (req, res, next) => {
  try {
    const result = await classReportServices.getAllClassReports(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Class reports retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const getSingleClassReport = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await classReportServices.getSingleClassReport(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Class report retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const updateClassReport = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await classReportServices.updateClassReport(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Class report updated successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const deleteClassReport = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await classReportServices.deleteClassReport(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Class report deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

export const classReportControllers = {
  createClassReport,
  getAllClassReports,
  getSingleClassReport,
  updateClassReport,
  deleteClassReport,
};
