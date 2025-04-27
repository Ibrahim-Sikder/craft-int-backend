import httpStatus from 'http-status';

import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';
import { subjectServices } from './subject.service';

const createSubject = catchAsync(async (req, res, next) => {
  try {
    const result = await subjectServices.createSubject(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Subject created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const getAllSubjects = catchAsync(async (req, res, next) => {
  try {
    const result = await subjectServices.getAllSubjects(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Subjects retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const getSingleSubject = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await subjectServices.getSingleSubject(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Subject retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const updateSubject = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await subjectServices.updateSubject(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Subject updated successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const deleteSubject = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await subjectServices.deleteSubject(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Subject deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

export const subjectControllers = {
  createSubject,
  getAllSubjects,
  getSingleSubject,
  updateSubject,
  deleteSubject,
};
