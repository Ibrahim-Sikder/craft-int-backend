import httpStatus from 'http-status';
import { classServices } from './class.service';
import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';

const createClass = catchAsync(async (req, res, next) => {
  try {
    const result = await classServices.createClass(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Class created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const getAllClasses = catchAsync(async (req, res, next) => {
  try {
    const result = await classServices.getAllClasses(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Classes retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const getSingleClass = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await classServices.getSingleClass(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Class retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const updateClass = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await classServices.updateClass(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Class updated successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const deleteClass = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await classServices.deleteClass(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Class deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

export const classControllers = {
  createClass,
  getAllClasses,
  getSingleClass,
  updateClass,
  deleteClass,
};
