/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import { catchAsync } from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { todayLessonServices } from './todaylesson.service';

const createTodayLesson = catchAsync(async (req, res, next) => {
  const result = await todayLessonServices.createTodayLesson(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Today's lesson created successfully",
    data: result,
  });
});

const getAllTodayLessons = catchAsync(async (req, res) => {
  const result = await todayLessonServices.getAllTodayLessons(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All today's lessons retrieved successfully",
    data: result,
  });
});

const getSingleTodayLesson = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await todayLessonServices.getSingleTodayLesson(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Today's lesson retrieved successfully",
    data: result,
  });
});

const updateTodayLesson = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await todayLessonServices.updateTodayLesson(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Today's lesson updated successfully",
    data: result,
  });
});

const deleteTodayLesson = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await todayLessonServices.deleteTodayLesson(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Today's lesson deleted successfully",
    data: result,
  });
});

export const todayLessonControllers = {
  createTodayLesson,
  getAllTodayLessons,
  getSingleTodayLesson,
  updateTodayLesson,
  deleteTodayLesson,
};
