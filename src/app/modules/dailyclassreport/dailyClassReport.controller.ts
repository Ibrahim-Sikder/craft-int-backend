import httpStatus from 'http-status';
import { dailyClassReportServices } from './dailyClassReport.service';
import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';

const createDailyClassReport = catchAsync(async (req, res, next) => {
  try {
    const result = await dailyClassReportServices.createDailyClassReport(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Daily class report created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const getAllDailyClassReports = catchAsync(async (req, res, next) => {
  try {
    const result = await dailyClassReportServices.getAllDailyClassReports(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Daily class reports retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const getSingleDailyClassReport = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await dailyClassReportServices.getSingleDailyClassReport(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Daily class report retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const updateDailyClassReport = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await dailyClassReportServices.updateDailyClassReport(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Daily class report updated successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const deleteDailyClassReport = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await dailyClassReportServices.deleteDailyClassReport(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Daily class report deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

export const dailyClassReportControllers = {
  createDailyClassReport,
  getAllDailyClassReports,
  getSingleDailyClassReport,
  updateDailyClassReport,
  deleteDailyClassReport,
};
