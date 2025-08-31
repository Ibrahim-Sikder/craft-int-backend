import httpStatus from 'http-status';
import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';
import { feedbackServices } from './feedback.service';

const createFeedback = catchAsync(async (req, res, next) => {
  try {
    const result = await feedbackServices.createFeedback(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedback submitted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const getAllFeedbacks = catchAsync(async (req, res, next) => {
  try {
    const result = await feedbackServices.getAllFeedbacks(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedbacks retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const getSingleFeedback = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await feedbackServices.getSingleFeedback(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedback retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const updateFeedback = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await feedbackServices.updateFeedback(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedback updated successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const deleteFeedback = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await feedbackServices.deleteFeedback(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedback deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

export const feedbackControllers = {
  createFeedback,
  getAllFeedbacks,
  getSingleFeedback,
  updateFeedback,
  deleteFeedback,
};
