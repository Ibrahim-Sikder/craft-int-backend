import httpStatus from 'http-status';
import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';
import { mealReportServices } from './mealreport.service';

const createMealReport = catchAsync(async (req, res, next) => {
  
  console.log(req.body)
  try {
    const result = await mealReportServices.createMealReport(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Meal report created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const getAllMealReports = catchAsync(async (req, res, next) => {
  try {
    const result = await mealReportServices.getAllMealReports(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Meal reports retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const getSingleMealReport = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await mealReportServices.getSingleMealReport(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Meal report retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const updateMealReport = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await mealReportServices.updateMealReport(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Meal report updated successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const deleteMealReport = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await mealReportServices.deleteMealReport(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Meal report deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

export const mealReportControllers = {
  createMealReport,
  getAllMealReports,
  getSingleMealReport,
  updateMealReport,
  deleteMealReport,
};
