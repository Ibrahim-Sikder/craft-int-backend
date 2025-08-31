/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../error/AppError';
import { Feedback, IFeedback } from './feedback.model';

const createFeedback = async (payload: IFeedback) => {
  if (!payload.type || !payload.title || !payload.description) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Type, Title, and Description are required',
    );
  }

  const result = await Feedback.create(payload);
  return result;
};

const getAllFeedbacks = async (query: Record<string, unknown>) => {
  const feedbackQuery = new QueryBuilder(Feedback.find(), query)
    .search(['type', 'category', 'title', 'priority', 'department'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await feedbackQuery.countTotal();
  const feedbacks = await feedbackQuery.modelQuery.exec();

  return {
    meta,
    feedbacks,
  };
};

const getSingleFeedback = async (id: string) => {
  const result = await Feedback.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Feedback not found');
  }
  return result;
};

const updateFeedback = async (id: string, payload: Partial<IFeedback>) => {
  const result = await Feedback.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update feedback');
  }

  return result;
};

const deleteFeedback = async (id: string) => {
  const result = await Feedback.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Feedback not found or already deleted',
    );
  }
  return result;
};

export const feedbackServices = {
  createFeedback,
  getAllFeedbacks,
  getSingleFeedback,
  updateFeedback,
  deleteFeedback,
};
